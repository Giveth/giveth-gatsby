/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Flex, Label, Text, jsx } from 'theme-ui'
import { useApolloClient } from '@apollo/client'
import { REGISTER_PROJECT_DONATION } from '../../apollo/gql/projects'
import { SAVE_DONATION } from '../../apollo/gql/donations'

import Modal from '../modal'
import QRCode from 'qrcode.react'
import { ensRegex } from '../../utils'
import LoadingModal from '../../components/loadingModal'
import { initOnboard, initNotify } from '../../services/onBoard'
import CopyToClipboard from '../copyToClipboard'
import SVGLogo from '../../images/svg/donation/qr.svg'
import { ethers } from 'ethers'
import getSigner from '../../services/ethersSigner'
// import Tooltip from '../../components/tooltip'
import Toast from '../../components/toast'
import styled from '@emotion/styled'
import { useWallet } from '../../contextProvider/WalletProvider'

let provider

const GIVETH_DONATION_AMOUNT = 5

const Content = styled.div`
  max-width: 41.25rem;
  word-wrap: break-word;
`

const AmountSection = styled.div`
  margin: 1.3rem 0 0 0;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`

const AmountContainer = styled.div`
  margin: 2rem 0;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`

const OpenAmount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const InputComponent = styled.input`
  background: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 0.4rem 1rem 4rem;
  outline: none;
`

const CheckboxLabel = styled(Label)`
  @media (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  cursor: pointer;
}
`

const Summary = styled(Flex)`
  flex-direction: column;
  margin: 2rem 0;
`

const SmRow = styled(Flex)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.75rem 0;
`

const OnlyCrypto = props => {
  // ON BOARD
  const { logout } = useWallet()
  const [wallet, setWallet] = useState(null)
  const [onboard, setOnboard] = useState(null)
  const [notify, setNotify] = useState(null)
  const { project } = props
  const [ethPrice, setEthPrice] = useState(1)
  const [amountTyped, setAmountTyped] = useState(null)
  const [donateToGiveth, setDonateToGiveth] = useState(false)
  const [anonymous, setAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const { isLoggedIn, user, sendTransaction, checkNetwork } = useWallet()

  const client = useApolloClient()

  useEffect(() => {
    const init = async () => {
      fetch(
        'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,CNY,JPY,GBP'
      )
        .then(response => response.json())
        .then(data => setEthPrice(data.USD))
      setOnboard(
        initOnboard({
          wallet: wallet => {
            if (wallet.provider) {
              setWallet(wallet)

              const ethersProvider = new ethers.providers.Web3Provider(
                wallet.provider
              )
              provider = ethersProvider
              window.localStorage.setItem('selectedWallet', wallet.name)
            } else {
              provider = null
              setWallet({})
            }
          }
        })
      )
      setNotify(initNotify())
    }
    // console.log(ethers.utils.parseEther('1.0'))
    init()
  }, [])

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem(
      'selectedWallet'
    )

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet)
    }
  }, [onboard])

  const donation = parseFloat(amountTyped)
  const givethFee =
    Math.round((GIVETH_DONATION_AMOUNT * 100.0) / ethPrice) / 100

  const subtotal = donation + (donateToGiveth === true ? givethFee : 0)

  const eth2usd = eth => {
    return (eth * ethPrice).toFixed(2)
  }

  const SummaryRow = ({ title, amount, style }) => {
    return (
      <SmRow style={style}>
        <Text
          sx={{
            variant: 'text.medium',
            textAlign: 'left',
            width: ['50%', '70%'],
            color: 'background'
          }}
        >
          {title}
        </Text>
        {amount?.length === 2 ? (
          <Flex sx={{ alignItems: 'center' }}>
            <Text sx={{ variant: 'text.small', color: 'anotherGrey', pr: 2 }}>
              {amount[0]}
            </Text>
            <Text sx={{ variant: 'text.medium', color: 'background' }}>
              {' '}
              {amount[1]}
            </Text>
          </Flex>
        ) : (
          <Text
            sx={{
              variant: 'text.small',
              textAlign: 'right',
              color: 'anotherGrey'
            }}
          >
            {amount}
          </Text>
        )}
      </SmRow>
    )
  }

  const readyToTransact = async () => {
    onboard.walletReset()
    const walletSelected = await onboard.walletSelect()

    if (!walletSelected) return false
    const ready = await onboard.walletCheck()

    return ready
  }

  // FOR REGULAR TX
  const sendTx = async fromOwnProvider => {
    try {
      setLoading(true)
      // CHECK ADDRESS
      let toAddress = project?.walletAddress
      if (ensRegex(project?.walletAddress)) {
        toAddress = await provider.resolveName(project?.walletAddress)
      }

      const transaction = {
        to: toAddress,
        value: ethers.utils.parseEther(subtotal.toString())
      }

      let hash
      if (fromOwnProvider && isLoggedIn) {
        const regularTransaction = await sendTransaction(transaction)
        hash = regularTransaction?.transactionHash
      } else {
        const signer = getSigner(provider)
        const signerTransaction = await signer.sendTransaction(transaction)
        hash = signerTransaction?.hash
      }
      if (!hash) throw new Error('Transaction failed')
      props.setHashSent({ hash, subtotal })

      const loggedInUserId = isLoggedIn ? Number(user.id) : null
      // Send tx hash to our graph
      try {
        const { data, error } = await client.mutate({
          mutation: SAVE_DONATION,
          variables: {
            transactionId: hash?.toString()
            // anonymous: false
          }
        })
        console.log({ data, error })
        const ob = onboard.getState()
      } catch (error) {
        alert(
          `There was an error saving your donation to our datbase. Your payment may stil have gone through. Please report this issue, and reference your transaction id ${hash?.toString()}`
        )
        await logout()
        console.log({ error })
        setLoading(false)
      }
      setLoading(false)
      // DO THIS ONLY IN PROD BECAUSE WE HAVE A LIMIT
      if (process.env.GATSBY_NETWORK === 'ropsten') return

      notify.config({ desktopPosition: 'topRight' })
      const { emitter } = notify.hash(hash)

      emitter.on('txPool', transaction => {
        return {
          // message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
          // or you could use onclick for when someone clicks on the notification itself
          onclick: () =>
            window.open(`https://etherscan.io/tx/${transaction.hash}`)
        }
      })

      emitter.on('txSent', console.log)
      emitter.on('txConfirmed', console.log)
      emitter.on('txSpeedUp', console.log)
      emitter.on('txCancel', console.log)
      emitter.on('txFailed', console.log)

      emitter.on('all', event => {
        console.log('ALLLLLLL', event)
      })
    } catch (error) {
      console.log({ error })
      setLoading(false)
      return Toast({ content: error?.message, type: 'error' })
    }
  }

  // Contract call example
  // const sendTx = async () => {
  //   try {
  //     await setProvider()
  //     const signer = getSigner(provider)
  //     console.log(ethers.utils.parseEther(subtotal.toString()))

  //     const abi = [
  //       {
  //         anonymous: false,
  //         inputs: [
  //           {
  //             indexed: false,
  //             internalType: 'address',
  //             name: 'origin',
  //             type: 'address'
  //           },
  //           {
  //             indexed: false,
  //             internalType: 'address',
  //             name: 'target',
  //             type: 'address'
  //           },
  //           {
  //             indexed: false,
  //             internalType: 'uint256',
  //             name: 'amount',
  //             type: 'uint256'
  //           }
  //         ],
  //         name: 'Transfer',
  //         type: 'event'
  //       },
  //       {
  //         constant: false,
  //         inputs: [
  //           {
  //             internalType: 'address payable',
  //             name: 'target',
  //             type: 'address'
  //           }
  //         ],
  //         name: 'transfer',
  //         outputs: [],
  //         payable: true,
  //         stateMutability: 'payable',
  //         type: 'function'
  //       }
  //     ]

  //     const contractAddress = '0x4248bfcfae44942D1C26296CCB554C66926E639D'

  //     const contract = new ethers.Contract(contractAddress, abi, signer)

  //     const overrides = {
  //       gasLimit: 500000,
  //       gasPrice: ethers.BigNumber.from('20000000000'),
  //       value: ethers.utils.parseEther(subtotal.toString())
  //     }

  //     const { hash } = await contract.transfer(
  //       '0x3Db054B9a0D6A76db171542bb049999dC191B817',
  //       overrides
  //     )

  //     console.log({ hash })

  //     notify.config({ desktopPosition: 'topRight' })
  //     const { emitter } = notify.hash(hash)

  //     emitter.on('txPool', transaction => {
  //       return {
  //         // message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
  //         // or you could use onclick for when someone clicks on the notification itself
  //         onclick: () =>
  //           window.open(`https://ropsten.etherscan.io/tx/${transaction.hash}`)
  //       }
  //     })

  //     emitter.on('txSent', console.log)
  //     emitter.on('txConfirmed', console.log)
  //     emitter.on('txSpeedUp', console.log)
  //     emitter.on('txCancel', console.log)
  //     emitter.on('txFailed', console.log)

  //     emitter.on('all', event => {
  //       console.log('ALLLLLLL', event)
  //     })
  //   } catch (error) {
  //     console.log({ error })
  //   }
  // }

  const confirmDonation = async fromOwnProvider => {
    try {
      if (!project?.walletAddress) {
        return Toast({
          content: 'There is no eth address assigned for this project',
          type: 'error'
        })
      }
      if (!amountTyped || parseFloat(amountTyped) <= 0) {
        return Toast({ content: 'Please set an amount', type: 'warn' })
      }
      if (!fromOwnProvider) {
        const ready = await readyToTransact()
        if (!ready) return
      }
      sendTx(fromOwnProvider)
    } catch (error) {
      return Toast({ content: error?.message || error, type: 'error' })
    }
  }

  return (
    <Content>
      {loading && <LoadingModal isOpen={loading} />}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel='QR Modal'
      >
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            py: 5,
            px: 4,
            maxWidth: ['85vw', '60vw', '60vw'],
            textAlign: 'center'
          }}
        >
          <Text
            sx={{
              color: 'secondary',
              variant: ['headings.h4', 'headings.h4'],
              mt: 2,
              mb: 4
            }}
          >
            Support {project?.title}
          </Text>
          <QRCode value={project?.walletAddress} size={250} />
          <Text sx={{ mt: 4, variant: 'text.default', color: 'secondary' }}>
            Please send ETH or ERC20 tokens using this address
          </Text>
          <Flex
            sx={{
              backgroundColor: 'lightGray',
              alignItems: 'center',
              px: 3,
              mt: 3
            }}
          >
            <Text
              sx={{
                variant: 'text.default',
                color: 'secondary',
                py: 2
              }}
            >
              {project?.walletAddress}
            </Text>
            <CopyToClipboard size='18px' text={project?.walletAddress} />
          </Flex>
        </Flex>
        <Text
          onClick={() => setIsOpen(false)}
          sx={{
            cursor: 'pointer',
            color: 'secondary',
            position: 'absolute',
            top: '20px',
            right: '24px',
            variant: 'text.default'
          }}
        >
          Close
        </Text>
      </Modal>
      <AmountSection>
        <AmountContainer sx={{ width: ['100%', '100%'] }}>
          <Text sx={{ variant: 'text.large', mb: 1, color: 'background' }}>
            Enter your Ether amount
          </Text>
          <Text sx={{ variant: 'text.large', color: 'anotherGrey', mb: 4 }}>
            {ethPrice && `1 ETH ≈ USD $${ethPrice}`}
          </Text>
          <OpenAmount>
            <Text
              sx={{
                variant: 'text.large',
                color: 'secondary',
                position: 'absolute',
                ml: 3
              }}
            >
              ETH
            </Text>
            <InputComponent
              sx={{
                variant: 'text.large',
                width: ['100%', '60%', '60%'],
                color: 'secondary',
                '::placeholder': {
                  color: 'anotherGrey'
                }
              }}
              placeholder='Amount'
              type='number'
              value={amountTyped}
              onChange={e => {
                e.preventDefault()
                if (
                  parseFloat(e.target.value) !== 0 &&
                  parseFloat(e.target.value) < 0.001
                ) {
                  return
                }
                setAmountTyped(e.target.value)
              }}
            />
          </OpenAmount>
        </AmountContainer>
        <>
          {/* <CheckboxLabel sx={{ mb: '12px', alignItems: 'center' }}>
            <>
              <Checkbox
                defaultChecked={donateToGiveth}
                onClick={() => setDonateToGiveth(!donateToGiveth)}
              />
              <Text
                sx={{
                  variant: 'text.medium',
                  textAlign: 'left'
                }}
              >
                Be a hero, add <strong> ${GIVETH_DONATION_AMOUNT}</strong> to
                help sustain Giveth
              </Text>
            </>
            <Tooltip content='When you donate to Giveth you put a smile on our face because we can continue to provide support and further develop the platform.' />
          </CheckboxLabel> */}
          {/* <CheckboxLabel
            sx={{ mb: '12px', alignItems: 'center', color: 'background' }}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Checkbox
                defaultChecked={anonymous}
                onClick={() => setAnonymous(!anonymous)}
              />
              <Text sx={{ variant: 'text.medium', textAlign: 'left' }}>
                Donate anonymously
              </Text>
            </div>
            <Tooltip content='When you donate anonymously, your name will never appear in public as a donor. But, your name will be recorded so that we can send a tax donation receipt.' />
          </CheckboxLabel> */}
          {/* <Label sx={{ mb: '10px', alignItems: 'center' }}>
            <Checkbox defaultChecked={false} />
            <Text sx={{ variant: 'text.medium' }}>Dedicate this donation</Text>
          </Label> */}
          {amountTyped && (
            <Summary>
              <SummaryRow
                title={`Support ${project?.title}`}
                amount={[
                  `$${eth2usd(donation)}`,
                  `ETH ${parseFloat(donation)}`
                ]}
              />
              {donateToGiveth && (
                <SummaryRow
                  title='Support Giveth'
                  amount={[
                    `$${GIVETH_DONATION_AMOUNT}`,
                    `≈ ETH ${(GIVETH_DONATION_AMOUNT / ethPrice).toFixed(2)}`
                  ]}
                />
              )}
              <SummaryRow
                title='Processing Fee'
                amount={['Network Fee Only']}
                style={{
                  borderBottom: '1px solid #6B7087',
                  padding: '0 0 18px 0'
                }}
              />
              <Text
                sx={{
                  variant: 'text.medium',
                  color: 'background',
                  textAlign: 'right'
                }}
              >
                ETH {parseFloat(subtotal)}
              </Text>
            </Summary>
          )}
        </>
        <Flex
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Flex sx={{ flexDirection: 'column' }}>
            <Button
              onClick={() => confirmDonation(isLoggedIn)}
              sx={{
                variant: 'buttons.default',
                padding: '1.063rem 7.375rem',
                mt: 2,
                textTransform: 'uppercase'
              }}
            >
              Donate
            </Button>
            {isLoggedIn && (
              <Text
                sx={{
                  mt: 2,
                  mx: 'auto',
                  cursor: 'pointer',
                  color: 'background',
                  '&:hover': {
                    color: 'accent'
                  }
                }}
                onClick={() => confirmDonation(false)}
              >
                click here to use another wallet
              </Text>
            )}
          </Flex>

          <SVGLogo
            onClick={() => setIsOpen(true)}
            sx={{ cursor: 'pointer', ml: 3 }}
          />
        </Flex>
      </AmountSection>
    </Content>
  )
}

export default OnlyCrypto

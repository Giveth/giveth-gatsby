/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useMutation } from '@apollo/client'
import { Button, Flex, Label, Text, jsx } from 'theme-ui'
import { useApolloClient } from '@apollo/client'
import { PopupContext } from '../../contextProvider/popupProvider'
import { REGISTER_PROJECT_DONATION } from '../../apollo/gql/projects'
import { SAVE_DONATION } from '../../apollo/gql/donations'

import Modal from '../modal'
import Select from '../selectWIthAutocomplete'
import QRCode from 'qrcode.react'
import { BsCaretDownFill } from 'react-icons/bs'
import { ensRegex, getERC20List } from '../../utils'
import LoadingModal from '../../components/loadingModal'
import useComponentVisible from '../../utils/useComponentVisible'
import { initOnboard, initNotify } from '../../services/onBoard'
import CopyToClipboard from '../copyToClipboard'
import SVGLogo from '../../images/svg/donation/qr.svg'
import { ethers } from 'ethers'
import theme from '../../gatsby-plugin-theme-ui'
import getSigner from '../../services/ethersSigner'
// import Tooltip from '../../components/tooltip'
import Toast from '../../components/toast'
import { toast } from 'react-toastify'
import InProgressModal from './inProgressModal'
import { useWallet } from '../../contextProvider/WalletProvider'
import * as transaction from '../../services/transaction'
import { saveDonation, saveDonationTransaction } from '../../services/donation'

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
  padding: 1rem 0.4rem 1rem 5rem;
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
  const [wallet, setWallet] = useState(null)
  const [onboard, setOnboard] = useState(null)
  const [mainToken, setMainToken] = useState(null)
  const [selectedToken, setSelectedToken] = useState(null)
  const [tokenSymbol, setTokenSymbol] = useState(null)
  const [notify, setNotify] = useState(null)
  const { project } = props
  const [tokenPrice, setTokenPrice] = useState(1)
  const [gasPrice, setGasPrice] = useState(null)
  const [gasETHPrice, setGasETHPrice] = useState(null)
  const [amountTyped, setAmountTyped] = useState(null)
  const [donateToGiveth, setDonateToGiveth] = useState(false)
  const [inProgress, setInProgress] = useState(false)
  const [txHash, setTxHash] = useState(null)
  const [erc20List, setErc20List] = useState([])
  const [anonymous, setAnonymous] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const usePopup = React.useContext(PopupContext)
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false)
  const {
    isLoggedIn,
    currentChainId,
    currentNetwork,
    sendTransaction,
    user,
    ready,
    wallet: userWallet
  } = useWallet()

  const client = useApolloClient()
  const { triggerPopup } = usePopup

  useEffect(() => {
    const init = async () => {
      fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${tokenSymbol}&tsyms=USD,EUR,CNY,JPY,GBP&api_key=${process.env.GATSBY_CRYPTOCOMPARE_KEY}`
      )
        .then(response => response.json())
        .then(data => setTokenPrice(data.USD))
      setOnboard(
        initOnboard(
          {
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
          },
          currentChainId === 100 ? currentChainId : null
        )
      )
      setNotify(initNotify())
    }
    // console.log(ethers.utils.parseEther('1.0'))
    init()
  }, [tokenSymbol, currentChainId])

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem(
      'selectedWallet'
    )
    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet)
    }
    const mainToken = currentChainId === 100 ? 'XDAI' : 'ETH'
    const currentMainToken = {
      symbol: mainToken,
      name: null
    }
    setMainToken(mainToken)
    setSelectedToken(currentMainToken)
    setTokenSymbol(mainToken)

    const tokenList = getERC20List(currentChainId)
    const formattedTokenList = tokenList?.tokens
      ? Array.from(tokenList?.tokens, token => {
          return {
            value: token,
            label: token?.symbol
          }
        })
      : []
    setErc20List([
      {
        value: currentMainToken,
        label: mainToken
      },
      ...formattedTokenList
    ])
    // GET GAS
    userWallet?.web3?.eth.getGasPrice().then(wei => {
      const gwei = userWallet.web3.utils.fromWei(wei, 'gwei')
      const ethFromGwei = userWallet.web3.utils.fromWei(wei, 'ether')
      gwei && setGasPrice(Number(gwei))
      ethFromGwei && setGasETHPrice(Number(ethFromGwei) * 21000)
    })
  }, [currentChainId])

  const donation = parseFloat(amountTyped)
  const givethFee =
    Math.round((GIVETH_DONATION_AMOUNT * 100.0) / tokenPrice) / 100

  const subtotal = donation + (donateToGiveth === true ? givethFee : 0)

  const eth2usd = eth => {
    if (!tokenPrice) return ''
    return `$ ${(eth * tokenPrice).toFixed(2)}`
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
            <Text
              sx={{
                variant: 'text.small',
                color: 'anotherGrey',
                paddingRight: '5px'
              }}
            >
              {amount[0]}
            </Text>
            <Text
              sx={{
                variant: 'text.medium',
                color: 'background',
                textAlign: 'end'
              }}
            >
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

  const confirmDonation = async isFromOwnProvider => {
    try {
      let fromOwnProvider = isFromOwnProvider
      // Until we accept every other network we will offer xDAI if detected only through metamask
      if (isXDAI) {
        fromOwnProvider = true
      }
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
        // Is not logged in, should try donation through onBoard
        const ready = await readyToTransact()
        if (!ready) return
      } else {
        userWallet?.enable()
      }
      Toast({
        content: 'Donation in progress...',
        type: 'dark',
        customPosition: 'top-left',
        isLoading: true,
        noAutoClose: true
      })

      const toAddress = ensRegex(project?.walletAddress)
        ? await provider.resolveName(project?.walletAddress)
        : project?.walletAddress

      const token = tokenSymbol
      const fromAddress = isLoggedIn ? user.getWalletAddress() : null

      await transaction.send(
        toAddress,
        token !== mainToken ? selectedToken?.address : false,
        subtotal,
        fromOwnProvider,
        isLoggedIn,
        sendTransaction,
        provider,
        {
          onTransactionHash: async transactionHash => {
            const instantReceipt = await transaction.getTxFromHash(
              transactionHash,
              isXDAI // isXDAI
            )
            console.log({ fromAddress, instantReceipt })
            //Save initial txn details to db
            const {
              donationId,
              savedDonation,
              saveDonationErrors
            } = await saveDonation(
              fromAddress || instantReceipt?.from,
              toAddress,
              transactionHash,
              currentChainId,
              Number(subtotal),
              token,
              Number(project.id)
            )
            console.log('DONATION RESPONSE: ', {
              donationId,
              savedDonation,
              saveDonationErrors
            })
            // onTransactionHash callback for event emitter
            transaction.confirmEtherTransaction(
              transactionHash,
              res => {
                if (!res) return
                toast.dismiss()
                if (res?.tooSlow) {
                  // Tx is being too slow
                  toast.dismiss()
                  setTxHash(transactionHash)
                  setInProgress(true)
                } else if (res?.status) {
                  // Tx was successful
                  props.setHashSent({ transactionHash, tokenSymbol, subtotal })
                } else {
                  // EVM reverted the transaction, it failed
                  Toast({
                    content: 'Transaction failed',
                    type: 'error'
                  })
                }
              },
              0,
              isXDAI
            )
            await saveDonationTransaction(transactionHash, donationId)
          },
          onReceiptGenerated: receipt => {
            props.setHashSent({
              transactionHash: receipt?.transactionHash,
              subtotal,
              tokenSymbol
            })
          },
          onError: error => {
            // the outside catch handles any error here
            // Toast({
            //   content: error?.error?.message || error?.message || error,
            //   type: 'error'
            // })
          }
        }
      )

      // Commented notify and instead we are using our own service
      // transaction.notify(transactionHash)
    } catch (error) {
      toast.dismiss()
      if (
        error?.data?.code === 'INSUFFICIENT_FUNDS' ||
        error?.data?.code === 'UNPREDICTABLE_GAS_LIMIT'
      ) {
        // TODO: change this to custom alert
        return triggerPopup('InsufficientFunds')
      }
      return Toast({
        content:
          error?.data?.message ||
          error?.error?.message ||
          error?.message ||
          error,
        type: 'error'
      })
    }
  }

  const isMainnet = currentChainId === 1
  const isXDAI = currentChainId === 100

  return (
    <Content ref={ref}>
      <InProgressModal
        showModal={inProgress}
        setShowModal={val => setInProgress(val)}
        txHash={txHash}
      />
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
          <Text sx={{ variant: 'text.large', mb: 3, color: 'background' }}>
            Enter your {tokenSymbol} amount
          </Text>
          {isMainnet && (
            <Text sx={{ variant: 'text.large', color: 'anotherGrey', mb: 4 }}>
              {tokenPrice &&
                tokenSymbol &&
                `1 ${tokenSymbol} ≈ USD $${tokenPrice}`}
            </Text>
          )}
          <OpenAmount>
            <Flex
              onClick={() => setIsComponentVisible(!isComponentVisible)}
              sx={{
                alignItems: 'center',
                position: 'absolute',
                cursor: 'pointer',
                ml: 3
              }}
            >
              <Text sx={{ mr: 2 }}>{tokenSymbol}</Text>
              <BsCaretDownFill size='12px' color={theme.colors.secondary} />
            </Flex>

            {isComponentVisible && (
              <Flex
                sx={{
                  position: 'absolute',
                  backgroundColor: 'background',
                  marginTop: '100px'
                }}
              >
                <Select
                  width='200px'
                  content={erc20List}
                  isTokenList
                  menuIsOpen
                  onSelect={i => {
                    setSelectedToken(i?.value || selectedToken)
                    setTokenSymbol(i?.label || tokenSymbol)
                    setIsComponentVisible(false)
                  }}
                  placeholder='search for a token'
                />
              </Flex>
            )}
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
                  `${eth2usd(donation)}`,
                  `${selectedToken?.symbol} ${parseFloat(donation)}`
                ]}
              />
              {donateToGiveth && (
                <SummaryRow
                  title='Support Giveth'
                  amount={[
                    `$${GIVETH_DONATION_AMOUNT}`,
                    `≈ ${selectedToken?.symbol} ${(
                      GIVETH_DONATION_AMOUNT / tokenPrice
                    ).toFixed(2)}`
                  ]}
                />
              )}
              {gasPrice && (
                <SummaryRow
                  title='Network Fee'
                  amount={[
                    'Gas Price',
                    `GWEI ${parseFloat(gasPrice).toFixed(2)}`
                  ]}
                />
              )}
              <Text
                sx={{
                  variant: 'text.medium',
                  color: 'background',
                  textAlign: 'right'
                }}
              >
                {selectedToken?.symbol === 'ETH'
                  ? `${selectedToken?.symbol} ${parseFloat(
                      subtotal + gasETHPrice
                    ).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6
                    })}`
                  : `${selectedToken?.symbol} ${parseFloat(subtotal).toFixed(
                      2
                    )}`}
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
              onClick={() => confirmDonation(isLoggedIn && ready)}
              sx={{
                variant: 'buttons.default',
                padding: '1.063rem 7.375rem',
                mt: 2,
                textTransform: 'uppercase'
              }}
            >
              Donate
            </Button>
            {isLoggedIn && ready && !isXDAI && (
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

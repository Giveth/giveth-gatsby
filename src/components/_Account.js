import MetaMaskOnboarding from '@metamask/onboarding'
import { useWeb3React } from '@web3-react/core'
import { UserRejectedRequestError } from '@web3-react/injected-connector'
import { useEffect, useRef, useState } from 'react'
import useLayoutEffect from '../lib/user-isomorphic-layout-effect'
import { injected } from '../connectors'
import useENSName from '../hooks/useENSName'
import { formatEtherscanLink, shortenHex } from '../util'

const Account = ({ triedToEagerConnect }) => {
  const { active, error, activate, chainId, account, setError } = useWeb3React()

  // initialize metamask onboarding
  const onboarding = useRef()

  useLayoutEffect(() => {
    onboarding.current = new MetaMaskOnboarding()
  }, [])

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false)
  useEffect(() => {
    if (active || error) {
      setConnecting(false)
      onboarding.current?.stopOnboarding()
    }
  }, [active, error])

  const ENSName = useENSName(account)

  if (error) {
    return null
  }

  if (!triedToEagerConnect) {
    return null
  }

  if (typeof account !== 'string') {
    const hasMetaMaskOrWeb3Available =
      MetaMaskOnboarding.isMetaMaskInstalled() ||
      window?.ethereum ||
      window?.web3

    return (
      <div>
        {hasMetaMaskOrWeb3Available ? (
          <button
            onClick={() => {
              setConnecting(true)

              activate(injected, undefined, true).catch(error => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false)
                } else {
                  setError(error)
                }
              })
            }}
          >
            {MetaMaskOnboarding.isMetaMaskInstalled()
              ? 'Connect to MetaMask'
              : 'Connect to Wallet'}
          </button>
        ) : (
          <button onClick={() => onboarding.current?.startOnboarding()}>
            Install Metamask
          </button>
        )}
      </div>
    )
  }

  return (
    <a
      {...{
        href: formatEtherscanLink('Account', [chainId, account]),
        target: '_blank',
        rel: 'noopener noreferrer'
      }}
    >
      {ENSName || `${shortenHex(account, 4)}`}
    </a>
  )
}

export default Account

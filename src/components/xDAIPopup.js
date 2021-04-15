import React from 'react'
import { Flex, Text, Button, Image } from 'theme-ui'
import { IoMdClose } from 'react-icons/io'
import iconStreamlineGas from '../images/icon-streamline-gas.svg'
import iconBgGas from '../images/background-gas.png'
import xDAIcon from '../images/xDAI_ETH_icon.png'
import theme from '../gatsby-plugin-theme-ui/index'

const XDAIPopupClosed = props => {
  const { fixed } = props
  const [showIssuePopup, setShowIssuePopup] = React.useState(false)

  React.useEffect(() => {
    // Commenting this as we want to show the popup everywhere even after closed
    const issueAlreadyClosed =
      typeof window !== 'undefined' &&
      window.localStorage.getItem('xDAIPopupClosed')
    if (!issueAlreadyClosed) {
      setShowIssuePopup(true)
    }
  })

  if (!showIssuePopup) return null
  let style = {
    width: '100%',
    backgroundColor: 'secondary',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 28px 52px rgba(44, 13, 83, 0.2)',
    px: 4,
    pt: 2
  }
  if (fixed) {
    style = {
      ...style,
      ...{
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 4
      }
    }
  }
  return (
    <Flex sx={style}>
      <Flex
        sx={{
          flexDirection: ['column', 'row', 'row'],
          flex: '0.7',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Image
          src={xDAIcon}
          sx={{
            display: ['none', 'block', 'block'],
            objectFit: 'contain',
            zIndex: 0,
            marginLeft: '-28px'
          }}
          height='50px'
          width='100px'
          alt='xDaiIcon'
        />
        <Text
          color='background'
          sx={{
            display: ['none', 'block', 'block'],
            zIndex: 2,
            marginLeft: '4px'
          }}
        >
          Giveth supports donations in most popular Cryptocurrencies.
        </Text>
        <Flex sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <img
            src={iconBgGas}
            style={{ position: 'absolute', marginLeft: '-32px' }}
            height='64px'
            width='64px'
            alt=''
          />
          <img
            src={iconStreamlineGas}
            style={{ marginRight: '12px' }}
            height='18px'
            width='18px'
            alt=''
          />
          <Text color='background'>Save on gas fees, use xDAI network!</Text>
        </Flex>
      </Flex>

      <Button
        type='button'
        aria-label='edit project name'
        variant='nofill'
        onClick={() => {
          typeof window !== 'undefined' &&
            window.localStorage.setItem('xDAIPopupClosed', 'true')
          setShowIssuePopup(false)
        }}
        sx={{
          backgroundColor: 'secondary',
          alignItems: 'center',
          my: 2
        }}
      >
        <Flex
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text
            variant='text.default'
            color='background'
            sx={{ fontSize: '14px', fontWeight: 700 }}
          >
            OK, GOT IT!
          </Text>
        </Flex>
      </Button>
    </Flex>
  )
}

export default XDAIPopupClosed

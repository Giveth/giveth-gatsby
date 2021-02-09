import React from 'react'
import { Flex, Text, Button, Image } from 'theme-ui'
import { FaGithub } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import CornerLeave from '../images/corner-leave.png'
import theme from '../gatsby-plugin-theme-ui/index'

const GithubIssue = props => {
  const { fixed } = props
  const [showIssuePopup, setShowIssuePopup] = React.useState(false)

  React.useEffect(() => {
    // check local storage
    const issueAlreadyClosed =
      typeof window !== 'undefined' &&
      window.localStorage.getItem('githubIssueClosed')
    if (!issueAlreadyClosed) {
      setShowIssuePopup(true)
    }
  })

  if (!showIssuePopup) return null
  let style = {
    m: 4,
    borderRadius: '12px',
    backgroundColor: 'background',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 28px 52px rgba(44, 13, 83, 0.2)'
  }
  if (fixed) {
    style = {
      ...style,
      ...{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 4
      }
    }
  }
  return (
    <Flex sx={style}>
      <Flex
        sx={{
          padding: ['25px 18px', '25px 10px', '25px 10px'],
          width: ['100%', '80%', '80%'],
          textAlign: 'center',
          flexDirection: 'column'
        }}
      >
        <Text variant='headings.h5' mb={1} color='secondary'>
          Give feedback
        </Text>
        <Text variant='text.default' color='secondary' mb={2}>
          Share your feedback or report an issue
        </Text>
        <Button
          type='button'
          aria-label='edit project name'
          variant='nofill'
          onClick={() => (
            window.open('https://github.com/Giveth/giveth-2/issues/new/choose'),
            '_blank'
          )}
          sx={{
            backgroundColor: 'secondary',
            alignItems: 'center'
          }}
        >
          <Flex
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 2
            }}
          >
            <FaGithub size='23.43px' color={theme.colors.background} />
            <Text
              variant='text.default'
              color='background'
              pl={2}
              sx={{ fontSize: '14px', fontWeight: 700 }}
            >
              GIVE FEEDBACK
            </Text>
          </Flex>
        </Button>
      </Flex>
      <Image
        src={CornerLeave}
        width={[60, 80, 80]}
        sx={{
          position: 'absolute',
          mb: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          borderBottomRightRadius: '12px'
        }}
      />
      <IoMdClose
        onClick={() => {
          typeof window !== 'undefined' &&
            window.localStorage.setItem('githubIssueClosed', true)
          setShowIssuePopup(false)
        }}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: '10px',
          right: '10px'
        }}
        size='20px'
        color={theme.colors.bodyLight}
      />
    </Flex>
  )
}

export default GithubIssue

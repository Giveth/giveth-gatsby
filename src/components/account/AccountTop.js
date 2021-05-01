/** @jsx jsx */
import { jsx, Text, Flex, Box } from 'theme-ui'
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'
import styled from '@emotion/styled'
import iconVerticalLine from '../../images/icon-vertical-line.svg'
import { useMediaQuery } from 'react-responsive'
import theme from '../../utils/theme-ui/index'

const UserSpan = styled.span`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-items: center;
  justify-self: end;
`
const CreateLink = styled(Link)`
  text-decoration: none;
  font-family: 'Red Hat Display', sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  color: ${theme.colors.primary};
  align-self: center;
  :hover {
    color: ${theme.colors.accent};
  }
`
const AccountTop = props => {
  const isDonation = (props?.query?.view || '') === 'donations'
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  return (
    <Flex
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        mx: '5%',
        height: '128px'
      }}
    >
      <Link
        href='/'
        sx={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          width: '80px',
          justifyContent: 'space-between',
          variant: 'links.default'
        }}
      >
        <BsArrowLeft size='24px' />
        <Text
          sx={{
            color: 'primary'
          }}
        >
          Giveth
        </Text>
      </Link>
      <Flex>
        <UserSpan>
          {isMobile ? null : (
            <span>
              <CreateLink href={isDonation ? '/projects' : '/create'}>
                <Text
                  sx={{
                    color: 'primary',
                    '&:hover': {
                      color: 'accent'
                    }
                  }}
                >
                  {isDonation ? 'Donate' : 'Create a project'}
                </Text>
              </CreateLink>
            </span>
          )}
          <img src={iconVerticalLine} alt='' />
          {/* <Login onLogin={onLogin} balance={balance} /> */}
        </UserSpan>
      </Flex>
    </Flex>
  )
}
export default AccountTop

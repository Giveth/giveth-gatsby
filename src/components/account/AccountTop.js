/** @jsx jsx */
import { jsx, Text, Flex, Box } from 'theme-ui'
import { Link } from 'gatsby'
import { BsArrowLeft } from 'react-icons/bs'
import styled from '@emotion/styled'
import iconVerticalLine from '../../images/icon-vertical-line.svg'
import { useMediaQuery } from 'react-responsive'
import theme from '../../gatsby-plugin-theme-ui/index'

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
        to='/'
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
            color: 'primary',
            '&:hover': {
              color: 'accent'
            }
          }}
        >
          Giveth
        </Text>
      </Link>
      <Flex>
        <UserSpan>
          {isMobile ? null : (
            <span>
              <CreateLink to='/create'>
                <Text
                  sx={{
                    color: 'primary',
                    '&:hover': {
                      color: 'accent'
                    }
                  }}
                >
                  Create a project
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

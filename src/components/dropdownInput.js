import React from 'react'
import styled from '@emotion/styled'
import DropIcon from '../images/svg/general/dropdown-arrow.svg'
import theme from '../gatsby-plugin-theme-ui'
import { Box, Flex, Text } from 'theme-ui'

const IconDrop = styled(DropIcon)`
  position: absolute;
  right: 1rem;
  top: 1.563rem;
`

const Dropdown = styled(Box)`
  position: relative;
  display: inline-block;
`

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  background: #ffffff;
  border: 1px solid #f5f5f5;
  box-sizing: border-box;
  box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.3);
  border-radius: 6px;
  margin: 15px 0 0 -11px;
`

const DropList = styled(Flex)`
  flex-direction: column;
`

const DropItem = styled.div`
  padding: 1rem 0 1rem 1rem;
  :hover {
    background-color: ${theme.colors.lightestBlue};
  }
`

const DropdownInput = ({ current, setCurrent, options }) => {
  const ListRef = React.useRef(null)
  return (
    <Dropdown
      variant='forms.search'
      style={{ width: '100%', cursor: 'pointer' }}
      sx={{ pr: 4 }}
      onMouseEnter={() => (ListRef.current.style.display = 'block')}
      onMouseLeave={() => (ListRef.current.style.display = 'none')}
    >
      <IconDrop />
      <Text
        sx={{
          variant: 'text.medium',
          fontWeight: 'bold',
          color: 'secondary'
        }}
      >
        {options[current]}
      </Text>
      <DropdownContent ref={ListRef} id='dropdownContent'>
        <DropList>
          {options?.map((i, index) => {
            return (
              <DropItem
                key={index}
                onClick={() => {
                  setCurrent(index)
                  ListRef.current.style.display = 'none'
                }}
              >
                <Text
                  sx={{
                    variant: 'text.medium',
                    fontWeight: 'bold',
                    color: 'secondary'
                  }}
                >
                  {i}
                </Text>
              </DropItem>
            )
          })}
        </DropList>
      </DropdownContent>
    </Dropdown>
  )
}

export default DropdownInput

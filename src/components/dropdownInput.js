import React from 'react'
import styled from '@emotion/styled'
import DropIcon from '../images/svg/general/dropdown-arrow.svg'
import { Box, Flex, Text } from 'theme-ui'

const IconDrop = styled(DropIcon)`
  position: absolute;
  right: 1rem;
  top: 1.563rem;
`

const Dropdown = styled(Box)`
  position: relative;
  display: inline-block;
  :hover div {
    display: block;
  }
`

const DropdownContent = styled.div`
  display: none;
  padding: 1rem 0 1rem 1rem;
  position: absolute;
  width: 100%;
  background: #ffffff;
  border: 1px solid #f5f5f5;
  box-sizing: border-box;
  box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.3);
  border-radius: 6px;
  margin: 15px 0 0 -11px;
`

const DropList = styled(Flex)``

const DropdownInput = () => {
  return (
    <Dropdown
      variant='forms.search'
      style={{ width: '100%', cursor: 'pointer' }}
      sx={{ pr: 4 }}
    >
      <IconDrop />
      <Text
        sx={{
          variant: 'text.medium',
          fontWeight: 'bold',
          color: 'secondary'
        }}
      >
        All Donations
      </Text>
      <DropdownContent>
        <DropList>
          {['All Donations', 'Fiat', 'Crypto'].map((i, key) => {
            return (
              <Text
                key={key}
                sx={{
                  variant: 'text.medium',
                  fontWeight: 'bold',
                  color: 'secondary'
                }}
              >
                {i}
              </Text>
            )
          })}
        </DropList>
      </DropdownContent>
    </Dropdown>
  )
}

export default DropdownInput

import React from 'react'
import styled from '@emotion/styled'
import DropIcon from '../images/svg/general/dropdown-arrow.svg'
import theme from '../gatsby-plugin-theme-ui'
import { Flex, Text } from 'theme-ui'
import useComponentVisible from '../utils/useComponentVisible'

const IconDrop = styled(DropIcon)`
  position: absolute;
  right: 1rem;
  top: 0.563rem;
`

const Dropdown = styled(Flex)`
  flex-direction: row;
  position: relative;
  display: inline-block;
`

const DropdownContent = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  background: ${theme.colors.background};
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
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false)

  return (
    <Dropdown
      variant='forms.search'
      style={{
        width: '100%',
        cursor: 'pointer',
        alignItems: 'center'
      }}
      sx={{ pr: 4 }}
      ref={ref}
      onClick={() => setIsComponentVisible(!isComponentVisible)}
      onMouseEnter={() => setIsComponentVisible(true)}
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
      {isComponentVisible && (
        <DropdownContent id='dropdownContent'>
          <DropList
            onMouseLeave={() => setIsComponentVisible(!isComponentVisible)}
          >
            {options?.map((i, index) => {
              return (
                <DropItem
                  key={index}
                  onClick={() => {
                    setCurrent && setCurrent(index)
                    setIsComponentVisible(!isComponentVisible)
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
      )}
    </Dropdown>
  )
}

export default DropdownInput

import React from 'react'
import styled from '@emotion/styled'
import DropIcon from '../images/svg/general/dropdown-arrow.svg'
import theme from '../utils/theme-ui'
import { Flex, Text } from 'theme-ui'
import useComponentVisible from '../utils/useComponentVisible'

const Dropdown = styled(Flex)`
  flex-direction: row;
  position: relative;
  display: inline-block;
`

const DropdownContent = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  max-height: 200px;
  overflow: scroll;
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

const DropdownInput = ({ current, setCurrent, upperLabel, options }) => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false)

  return (
    <Flex sx={{ width: '100%', flexDirection: 'column' }}>
      {upperLabel && (
        <Text variant='text.overlineSmall' color='secondary' sx={{ mb: 2 }}>
          {upperLabel}
        </Text>
      )}
      <Dropdown
        variant='forms.search'
        sx={{
          width: '100%',
          cursor: 'pointer',
          backgroundColor: theme.colors.background,
          borderColor: 'transparent',
          boxShadow: '0px 4px 20px rgba(212, 218, 238, 0.4)',
          borderRadius: '12px',
          textTransform: 'capitalize',
          padding: '1.125rem 0 1.125rem 1rem',
          '::placeholder': {
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: '1.188rem',
            color: '#AAAFCA'
          }
        }}
        ref={ref}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
        onMouseEnter={() => setIsComponentVisible(true)}
      >
        <Flex
          sx={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text
            sx={{
              variant: 'text.medium',
              fontWeight: 'bold',
              color: 'secondary'
            }}
          >
            {options[current]}
          </Text>
          <DropIcon style={{ marginRight: '16px' }} />
        </Flex>

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
    </Flex>
  )
}

export default DropdownInput

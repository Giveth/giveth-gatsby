import React, { useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Select from 'react-select'
import { Text, Flex } from 'theme-ui'
import styled from '@emotion/styled'
import theme from '../utils/theme-ui/index'

// TODO: FIX ICONS
// import iconManifest from '../../node_modules/cryptocurrency-icons/manifest.json'
// import ETHIcon from '../../node_modules/cryptocurrency-icons/svg/color/eth.svg'

const SelectWithAutocomplete = ({
  content,
  width,
  placeholder,
  onSelect,
  menuIsOpen,
  isTokenList
}) => {
  const options = content || [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const CustomOption = props => {
    const { children, value, innerProps, isDisabled } = props
    const [icon, setIcon] = useState(null)
    const StyledOption = styled.div`
      &:hover {
        div {
          color: ${theme.colors.background};
        }
        background-color: ${theme.colors.hover};
      }
    `

    if (isDisabled) return null
    let toShow = children
    // Special render for tokens, showing extra info
    if (isTokenList) {
      let img = ''
      // const found = iconManifest?.find(
      //   i => i?.symbol === value?.symbol?.toUpperCase()
      // )
      const found = null
      if (found) {
        // import(
        //   `../../node_modules/cryptocurrency-icons/32/color/${
        //     value?.symbol?.toLowerCase() || 'eth'
        //   }.png`
        // ).then(importedImg => {
        //   img = importedImg?.default
        //   setIcon(img)
        // })
      }

      toShow = (
        <Flex style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            src={icon || `/assets/tokens/${value?.symbol?.toUpperCase()}.png`}
            alt={value?.symbol}
            onError={ev => {
              // ev.target.src = ETHIcon
              ev.target.onerror = null
            }}
            width={'32px'}
            height={'32px'}
          />
          <Text variant='text.default' color='secondary' sx={{ pl: 2 }}>
            {`${value?.symbol}`}
          </Text>
        </Flex>
      )
    }
    return (
      <StyledOption
        {...innerProps}
        style={{
          cursor: 'pointer',
          color: theme.colors.secondary,
          fontFamily: theme.fonts.body,
          padding: 20
        }}
      >
        {toShow}
      </StyledOption>
    )
  }

  return (
    <Select
      options={options}
      components={{ Option: CustomOption }}
      placeholder={placeholder || 'Select an option'}
      onChange={onSelect}
      menuIsOpen={menuIsOpen}
      styles={{
        placeholder: provided => ({
          ...provided,
          color: theme.colors.anotherGrey
        }),
        valueContainer: provided => ({
          ...provided,
          padding: 15,
          margin: 0,
          fontSize: '18px',
          fontFamily: theme.fonts.body,
          color: theme.colors.secondary
        }),
        menu: provided => ({
          ...provided,
          marginTop: '-5px'
        }),
        menuList: provided => ({
          ...provided,
          maxHeight: '150px'
        }),
        control: () => ({
          // none of react-select's styles are passed to <Control />
          display: 'flex',
          flexDirection: 'row',
          width: width
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1
          const transition = 'opacity 300ms'

          return { ...provided, opacity, transition }
        }
      }}
    />
  )
}

export default SelectWithAutocomplete

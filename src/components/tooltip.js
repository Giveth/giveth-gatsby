import React from 'react'
import { Container, NavLink, Text } from 'theme-ui'
import styled from '@emotion/styled'
import theme from '../gatsby-plugin-theme-ui/index'
import TooltipImg from '../images/svg/general/decorators/tooltip.svg'

const TooltipText = styled.span``
const Tooltip = styled.div`
  margin: 0 0.5rem;

  .tooltip-text {
    visibility: hidden;
    width: 180px;
    background-color: white;
    color: black;
    text-align: center;
    border-radius: 6px;
    padding: 1rem;
    margin: 0 0 0 5px;

    text-align: left;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }
  &:hover .tooltip-text {
    visibility: visible;
  }
  @media (max-width: 600px) {
    .tooltip-text {
      margin: 10% 0 0 0;
      left: 10%;
    }
  }
`

export default function ToolTip({ content }) {
  return (
    <Tooltip
      sx={{
        ':hover': {
          visibility: 'visible'
        }
      }}
    >
      <TooltipImg />
      <span className='tooltip-text'>
        <Text sx={{ variant: 'text.small' }}>{content}</Text>
      </span>
    </Tooltip>
  )
}

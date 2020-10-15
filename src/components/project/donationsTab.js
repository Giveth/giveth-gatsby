import React from 'react'
import styled from '@emotion/styled'
import { Button, Flex, Text } from 'theme-ui'
import Table from '../table'

const Funds = styled.div`
  padding: 2rem;
  background: #edf0fa;
  border: 1px solid #d4daee;
  box-sizing: border-box;
  border-radius: 12px;
`

export const DonationsTab = ({ showModal, setShowModal }) => (
  <div>
    <Funds>
      <Text sx={{ variant: 'text.medium', color: 'secondary' }}>
        TOTAL FUNDS RAISED:
      </Text>
      <Text sx={{ variant: 'headings.display', color: 'secondary' }}>
        $100.000,00
      </Text>
    </Funds>
    <Table />
  </div>
)

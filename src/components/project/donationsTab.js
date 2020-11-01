import React from 'react'
import styled from '@emotion/styled'
import { ProjectContext } from '../../contextProvider/projectProvider'
import { Button, Flex, Text } from 'theme-ui'
import theme from '../../gatsby-plugin-theme-ui'
import Table from './donationsTable'

const Funds = styled.div`
  padding: 2rem;
  background: ${theme.colors.lightestBlue};
  border: 1px solid #d4daee;
  box-sizing: border-box;
  border-radius: 12px;
`

export const DonationsTab = ({ showModal, setShowModal }) => {
  const { currentProjectView, setCurrentProjectView } = React.useContext(
    ProjectContext
  )
  const donations = currentProjectView?.donations
  const total =
    donations?.length > 0 &&
    donations.reduce((a, b) => ({ amount: a.amount + b.amount }))

  return (
    <div>
      <Funds>
        <Text sx={{ variant: 'text.medium', color: 'secondary' }}>
          TOTAL FUNDS RAISED:
        </Text>
        <Text
          sx={{
            variant: ['headings.h3', null, 'headings.display'],
            color: 'secondary'
          }}
        >
          {(total?.amount / 10)?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </Text>
      </Funds>
      <Table />
    </div>
  )
}

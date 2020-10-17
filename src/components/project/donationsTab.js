import React from 'react'
import styled from '@emotion/styled'
import { ProjectContext } from '../../contextProvider/projectProvider'
import { Button, Flex, Text } from 'theme-ui'
import theme from '../../gatsby-plugin-theme-ui'
import Table from './projectDonationsTable'

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
  const total = donations?.reduce((a, b) => ({ amount: a.amount + b.amount }))
  console.log({ donations, total })

  return (
    <div>
      <Funds>
        <Text sx={{ variant: 'text.medium', color: 'secondary' }}>
          TOTAL FUNDS RAISED:
        </Text>
        <Text sx={{ variant: 'headings.display', color: 'secondary' }}>
          {total?.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </Text>
      </Funds>
      <Table />
    </div>
  )
}

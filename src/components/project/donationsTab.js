import React from 'react'
import styled from '@emotion/styled'
import { ethers } from 'ethers'
import { ProjectContext } from '../../contextProvider/projectProvider'
import { Button, Flex, Spinner, Text } from 'theme-ui'
import theme from '../../gatsby-plugin-theme-ui'
import Table from './donationsTable'

const Funds = styled.div`
  padding: 2rem;
  background: ${theme.colors.lightestBlue};
  border: 1px solid #d4daee;
  box-sizing: border-box;
  border-radius: 12px;
`

const DonationsTab = ({ project, showModal, setShowModal }) => {
  const [loading, setLoading] = React.useState(true)
  const { currentProjectView, setCurrentProjectView } = React.useContext(
    ProjectContext
  )
  console.log({ currentProjectView })
  const total = currentProjectView?.ethBalance

  React.useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return <Spinner variant='spinner.medium' />
  }

  if (!total)
    return (
      <Text sx={{ variant: 'text.large', color: 'secondary' }}>
        No donations yet :(
      </Text>
    )

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
          {`${parseFloat(
            ethers.utils.formatEther(currentProjectView?.ethBalance)
          )} ETH` ||
            (total?.amount / 10)?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
        </Text>
      </Funds>
      <Table donations={currentProjectView?.donations} />
    </div>
  )
}

export default DonationsTab

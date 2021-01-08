import React from 'react'
import styled from '@emotion/styled'
import { ethers } from 'ethers'
import { ProjectContext } from '../../contextProvider/projectProvider'
import { Spinner, Text } from 'theme-ui'
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
  const { currentProjectView } = React.useContext(ProjectContext)
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
          ).toFixed(4)} ETH` ||
            (total?.amount / 10)?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
        </Text>
        <Text
          sx={{
            variant: 'text.medium',
            color: 'bodyLight',
            fontWeight: 'bold',
            cursor: 'pointer',
            mt: -3
          }}
          onClick={() =>
            window.open(
              `https://etherscan.io/address/${project?.walletAddress}`
            )
          }
        >
          {project?.walletAddress}
        </Text>
      </Funds>
      <Table donations={currentProjectView?.donations} />
    </div>
  )
}

export default DonationsTab

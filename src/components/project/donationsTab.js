import React from 'react'
import styled from '@emotion/styled'
import { ethers } from 'ethers'
import { ProjectContext } from '../../contextProvider/projectProvider'
import { Spinner, Flex, Text } from 'theme-ui'
import theme from '../../gatsby-plugin-theme-ui'
import DonationsTable from './donationsTable'

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
  const donations = project.donations

  const totalDonations = donations
    ? donations.reduce((total, donation) => total + donation.amount, 0)
    : 0
  const totalUSDonations = donations
    ? donations.reduce((total, donation) => total + donation.valueUsd, 0)
    : 0
  React.useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return <Spinner variant='spinner.medium' />
  }

  if (!totalDonations)
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
        <Flex
          sx={{
            flexDirection: 'row',
            alignItems: 'flex-end'
          }}
        >
          {totalUSDonations && totalDonations > 0 ? (
            <Text
              sx={{
                pr: 4,
                variant: ['headings.h3', null, 'headings.display'],
                color: 'secondary'
              }}
            >
              {totalUSDonations?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </Text>
          ) : null}

          <Text
            sx={{
              variant: ['headings.h6', null, 'headings.h5'],
              pb: 3,
              color: 'secondary'
            }}
          >
            {
              // currentProjectView?.ethBalance
              //   ? `${parseFloat(currentProjectView?.ethBalance).toFixed(4)} ETH`
              //   : totalDonations &&
              //     (totalDonations / 10)?.toLocaleString('en-US', {
              //       style: 'currency',
              //       currency: 'USD'
              //     })
            }
          </Text>
        </Flex>
        <Text
          sx={{
            variant: 'text.medium',
            color: 'bodyLight',
            fontWeight: 'bold',
            cursor: 'pointer',
            mt: -2
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
      <DonationsTable donations={donations} />
    </div>
  )
}

export default DonationsTab

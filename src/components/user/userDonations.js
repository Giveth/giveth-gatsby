import React from 'react'
import { Flex } from 'theme-ui'
import DonationsTable from './donationsTable'

export const UserDonations = props => {
  return (
    <Flex>
      <DonationsTable {...props} />
    </Flex>
  )
}

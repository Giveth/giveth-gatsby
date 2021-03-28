import React from 'react'
import { Flex, Text, Button } from 'theme-ui'
import { ProfileHeader, UserDonations, UserProjects } from './index'
import { useQueryParams, StringParam } from 'use-query-params'

export const PublicProfileView = props => {
  const [query, setQuery] = useQueryParams({
    tab: StringParam
  })

  const Tab = ({ name }) => {
    const tab = query?.tab?.toLowerCase() || 'projects'
    return (
      <Button
        variant='nofill'
        type='button'
        sx={{ mx: 2 }}
        onClick={e => {
          e.preventDefault()
          setQuery({ tab: name })
        }}
      >
        <Text
          sx={{
            color: '#303B72',
            paddingBottom: '0.5rem',
            borderBottomColor: tab === name ? '#C2449F' : null,
            borderBottomStyle: tab === name ? 'solid' : null,
            textTransform: 'capitalize'
          }}
        >
          {name}
        </Text>
      </Button>
    )
  }

  const showTab = () => {
    switch (query?.tab?.toLowerCase()) {
      case 'projects':
        return <UserProjects {...props} />
      case 'donations':
        return <UserDonations {...props} />
      default:
        return <UserProjects {...props} />
    }
  }

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <ProfileHeader {...props} />
      <Flex sx={{ width: ['100%', '500px', '500px'], ml: 4 }}>
        <Tab name='projects' />
        <Tab name='donations' />
      </Flex>
      {showTab()}
    </Flex>
  )
}

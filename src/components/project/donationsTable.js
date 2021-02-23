/** @jsx jsx */
import React from 'react'
import { ethers } from 'ethers'
import { ProjectContext } from '../../contextProvider/projectProvider'
import { useApolloClient } from '@apollo/client'
import { GET_PROJECT_BY_ADDRESS } from '../../apollo/gql/projects'
import Pagination from 'react-js-pagination'
import SearchIcon from '../../images/svg/general/search-icon.svg'
import styled from '@emotion/styled'
import theme from '../../gatsby-plugin-theme-ui'
import {
  Avatar,
  Badge,
  Button,
  Box,
  Input,
  Flex,
  Spinner,
  Text,
  jsx
} from 'theme-ui'
import Jdenticon from 'react-jdenticon'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import DropdownInput from '../dropdownInput'

dayjs.extend(localizedFormat)

const Table = styled.table`
  border-collapse: collapse;
  margin: 4rem 0;
  padding: 0;
  width: 100%;

  thead {
    text-align: left;
  }

  caption {
    font-size: 1.5em;
    margin: 0.5em 0 0.75em;
  }

  tr {
    border-bottom: 1px solid #eaebee;
    padding: 0.35em;
  }
  th,
  td {
    padding: 0.625em;
  }

  th {
    padding: 1rem 0;
    font-size: 0.625rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  td {
    padding: 1rem 0;
  }

  @media screen and (max-width: 800px) {
    border: 0;

    caption {
      font-size: 1.3em;
    }

    thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    tr {
      border-bottom: 5px solid #eaebee;
      display: block;
      margin: 1rem 0 4rem 0;
    }
    tr:last-child {
      margin: 1rem 0 0 0;
    }

    td {
      border-bottom: 1px solid #eaebee;
      display: block;
      font-size: 0.8em;
      text-align: right;
    }

    td::before {
      content: attr(aria-label);
      content: attr(data-label);
      float: left;
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    td:last-child {
      border-bottom: 0;
    }
  }
`
const PagesStyle = styled.div`
  .inner-pagination {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    list-style-type: none;
    font-family: ${theme.fonts.body};
    margin: 0 0 3rem 0;
    a {
      text-decoration: none;
    }
  }
  .item-page {
    padding: 0.4rem 1rem;
    margin: 0 0.3rem;
    a {
      color: ${theme.colors.secondary};
    }
  }
  .active-page {
    padding: 0.4rem 1rem;
    margin: 0 0.3rem;
    text-align: center;
    background-color: ${theme.colors.secondary};
    border-radius: 4px;
    a {
      color: white;
    }
  }
`

const DonorBox = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const IconSearch = styled(SearchIcon)`
  margin-left: -2.5rem;
`
const SearchInput = styled(Flex)`
  align-items: center;
`
const FilterInput = styled(Flex)`
  align-items: center;
`

const FilterBox = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`

const DonationsTable = ({ donations }) => {
  const options = ['All Donations', 'Fiat', 'Crypto']
  const [currentDonations, setCurrentDonations] = React.useState([])
  const [filter, setFilter] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const client = useApolloClient()

  React.useEffect(() => {
    const setup = async () => {
      setCurrentDonations(donations)
      setLoading(false)
    }

    setup()
  }, [donations])

  const searching = search => {
    if (!search || search === '') {
      return setCurrentDonations(donations)
    }
    const some = donations?.filter(donation => {
      return (
        donation?.fromWalletAddress
          ?.toString()
          .toLowerCase()
          .indexOf(search.toString().toLowerCase()) === 0
      )
    })
    setCurrentDonations(some)
  }

  const filterDonations = items => {
    switch (options[filter]) {
      case 'All Donations':
        return items
      case 'Fiat':
        return items?.filter(item => item?.currency === 'USD')
      case 'Crypto':
        return items?.filter(item => item?.currency === 'ETH')
      default:
        return items
    }
  }

  const filteredDonations = filterDonations(currentDonations)

  const TableToShow = () => {
    const paginationItems = filteredDonations

    const [activeItem, setCurrentItem] = React.useState(1)

    // Data to be rendered using pagination.
    const itemsPerPage = 10

    // Logic for displaying current items
    const indexOfLastItem = activeItem * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    const currentItems = paginationItems?.slice(
      indexOfFirstItem,
      indexOfLastItem
    )

    const handlePageChange = pageNumber => {
      setCurrentItem(pageNumber)
    }

    // const filterTx = async () => {
    //   // ADAPT THIS
    //   try {
    //     const { data } = await client.query({
    //       query: GET_PROJECT_BY_ADDRESS,
    //       variables: {
    //         address: '0xDED8DAE93e585977BC09e1Fd857a97D997b71fCD'
    //       }
    //     })
    //     console.log('BO', { data })
    //   } catch (error) {
    //     console.log({ error })
    //   }
    // }

    // filterTx()
    return (
      <>
        <Table>
          <thead>
            <tr>
              {['Date', 'Donor', 'Currency', 'Amount'].map((i, index) => {
                return (
                  <th scope='col' key={index}>
                    <Text
                      sx={{
                        variant: 'text.small',
                        fontWeight: 'bold',
                        color: 'secondary'
                      }}
                    >
                      {i}
                    </Text>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {currentItems
              ?.slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((i, key) => {
                if (!i) return null
                console.log('donation', { i })
                return (
                  <tr key={key}>
                    <td
                      data-label='Account'
                      sx={{ variant: 'text.small', color: 'secondary' }}
                    >
                      <Text sx={{ variant: 'text.small', color: 'secondary' }}>
                        {i?.createdAt
                          ? dayjs(i.createdAt).format('ll')
                          : 'null'}
                      </Text>
                    </td>
                    <DonorBox
                      data-label='Donor'
                      sx={{
                        variant: 'text.small',
                        color: 'secondary',
                        svg: { borderRadius: '50%' }
                      }}
                    >
                      {i?.user?.avatar ? (
                        <Avatar src={i?.user?.avatar} />
                      ) : (
                        <Jdenticon size='32' value={i?.fromWalletAddress} />
                      )}
                      <Text
                        sx={{
                          variant: 'text.small',
                          color: 'secondary',
                          ml: 2
                        }}
                      >
                        {i?.user?.firstName && i?.user?.lastName
                          ? i?.user?.firstName + ' ' + i?.user?.lastName
                          : i?.user?.name ||
                            i?.user?.walletAddress ||
                            i?.fromWalletAddress}
                      </Text>
                    </DonorBox>
                    <td
                      data-label='Currency'
                      sx={{ variant: 'text.small', color: 'secondary' }}
                    >
                      <Badge variant='green'>{i?.currency}</Badge>
                    </td>
                    <td
                      data-label='Amount'
                      sx={{ variant: 'text.small', color: 'secondary' }}
                    >
                      <Text
                        sx={{
                          variant: 'text.small',
                          // whiteSpace: 'pre-wrap',
                          color: 'secondary'
                        }}
                      >
                        {i?.currency === 'ETH' && i?.valueUsd
                          ? `${
                              i?.amount ? `${i?.amount} ETH` : ''
                            } \n ~ USD $ ${i?.valueUsd?.toFixed(2)}`
                          : i?.amount?.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            })}
                      </Text>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
        <PagesStyle>
          <Pagination
            hideNavigation
            hideFirstLastPages
            activePage={activeItem}
            itemsCountPerPage={6}
            totalItemsCount={paginationItems.length}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            innerClass='inner-pagination'
            itemClass='item-page'
            activeClass='active-page'
          />
        </PagesStyle>
      </>
    )
  }

  return (
    <>
      <FilterBox sx={{ pt: 4, flexDirection: ['column-reverse', null, 'row'] }}>
        <FilterInput sx={{ width: ['100%', null, '30%'], mt: [4, 0, 0] }}>
          <DropdownInput
            options={options}
            current={filter}
            setCurrent={i => setFilter(i)}
          />
        </FilterInput>
        <SearchInput sx={{ width: ['100%', null, '65%'] }}>
          <Input
            defaultValue=''
            placeholder='Search Donations'
            variant='forms.search'
            onChange={e => searching(e.target.value)}
          />
          <IconSearch />
        </SearchInput>
      </FilterBox>
      {loading ? (
        <Flex sx={{ justifyContent: 'center', pt: 5 }}>
          <Spinner variant='spinner.medium' />
        </Flex>
      ) : !filteredDonations || filteredDonations?.length === 0 ? (
        <Table>
          <Text sx={{ variant: 'text.large', color: 'secondary' }}>
            No donations yet :(
          </Text>
        </Table>
      ) : (
        <TableToShow />
      )}
    </>
  )
}

export default DonationsTable

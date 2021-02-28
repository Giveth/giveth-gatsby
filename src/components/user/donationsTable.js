/** @jsx jsx */
import React from 'react'
import { getEtherscanPrefix, titleCase } from '../../utils'
import Pagination from 'react-js-pagination'
import styled from '@emotion/styled'
import theme from '../../gatsby-plugin-theme-ui'
import { Badge, Flex, Text, jsx } from 'theme-ui'
// import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

const Table = styled.table`
  border-collapse: collapse;
  margin: 4rem 0;
  padding: 0;
  table-layout: fixed;
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
  thead th:first-child {
    border-left: none;
    width: 10em;
    min-width: 10em;
    max-width: 10em;
  }

  thead th:nth-child(3),
  thead th:nth-child(4) {
    border-left: none;
    width: 20em;
    min-width: 20em;
    max-width: 20em;
  }
  th,
  td {
    padding: 0.625em;
    width: 80%;
    overflow: auto;
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
      width: 100%;
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

const DonationsTable = props => {
  const options = ['All Donations', 'Fiat', 'Crypto']
  const [currentDonations, setCurrentDonations] = React.useState(
    props?.donations
  )
  const [filter, setFilter] = React.useState(0)

  const filterDonations = items => {
    switch (options[filter]) {
      case 'All Donations':
        return items
      case 'Fiat':
        return items?.filter(item => item.currency === 'USD')
      case 'Crypto':
        return items?.filter(item => item.currency === 'ETH')
      default:
        return items
    }
  }

  const filteredDonations = filterDonations(currentDonations)

  const TableToShow = () => {
    const paginationItems = filteredDonations

    const [activeItem, setCurrentItem] = React.useState(1)

    // Data to be rendered using pagination.
    const itemsPerPage = 20

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

    const copy = hash => {
      navigator.clipboard.writeText(hash)
    }

    // const etherscanPrefix = getEtherscanPrefix()

    return (
      <Flex sx={{ flexDirection: 'column', mx: [2, 5, 5] }}>
        <Table>
          <thead>
            <tr>
              {['Date', 'Project', 'Currency', 'Amount'].map((i, index) => {
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
                      data-label='Project'
                      sx={{ variant: 'text.small', color: 'secondary' }}
                    >
                      <Text
                        sx={{
                          variant: 'text.medium',
                          color: 'primary',
                          ml: 2
                        }}
                      >
                        {titleCase(i?.project?.title) || i?.donor}
                      </Text>
                    </DonorBox>
                    <td
                      data-label='Currency'
                      sx={{ variant: 'text.small', color: 'secondary' }}
                    >
                      <Badge variant='green'>{i.currency}</Badge>
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
      </Flex>
    )
  }

  return (
    <>
      {!filteredDonations || filteredDonations?.length === 0 ? (
        <Text sx={{ variant: 'headings.h5', color: 'secondary', mx: 5, mt: 4 }}>
          No donations :(
        </Text>
      ) : (
        <TableToShow />
      )}
    </>
  )
}

export default DonationsTable

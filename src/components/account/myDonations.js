/** @jsx jsx */
import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { ProjectContext } from '../../contextProvider/projectProvider'
import { getEtherscanPrefix, titleCase } from '../../utils'
import { navigate } from 'gatsby'
import Pagination from 'react-js-pagination'
import SearchIcon from '../../images/svg/general/search-icon.svg'
import theme from '../../gatsby-plugin-theme-ui'
import { Input, Flex, Spinner, Text, jsx } from 'theme-ui'
import { useWallet } from '../../contextProvider/WalletProvider'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import DropdownInput from '../dropdownInput'
import { FiCopy, FiExternalLink } from 'react-icons/fi'

import iconManifest from '../../../node_modules/cryptocurrency-icons/manifest.json'
import ETHIcon from '../../../node_modules/cryptocurrency-icons/svg/color/eth.svg'

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
  thead th {
    border-left: none;
    width: 10em;
    min-width: 10em;
    max-width: 10em;
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

const MyDonations = props => {
  const options = ['All Donations', 'Fiat', 'Crypto']
  // const { user } = useWallet()
  const [currentDonations, setCurrentDonations] = React.useState([])
  const [filter, setFilter] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  // TODO: Set this context for the user
  const { currentProjectView, setCurrentProjectView } = React.useContext(
    ProjectContext
  )

  const etherscanPrefix = getEtherscanPrefix()

  useEffect(() => {
    const setup = async () => {
      window.scrollTo(0, 0)
      if (props?.donations) {
        setCurrentDonations(props?.donations)
        setLoading(false)
      }
    }

    setup()
  })

  const searching = search => {
    const donations = currentDonations
    if (!search || search === '') {
      return setCurrentDonations(props?.donations)
    }
    const some = donations.filter(donation => {
      if (!donation?.project.title) return null
      return (
        donation?.project.title
          ?.toString()
          ?.toLowerCase()
          .indexOf(search?.toString().toLowerCase()) === 0
      )
    })
    setCurrentDonations(some)
  }

  const filterDonations = items => {
    switch (options[filter]) {
      case 'All Donations':
        return items
      case 'Fiat':
        return items?.filter(item => item.donationType !== 'crypto')
      case 'Crypto':
        return items?.filter(item => item.donationType === 'crypto')
      default:
        return items
    }
  }

  const filteredDonations = [...filterDonations(currentDonations)].sort(
    (a, b) => {
      return new Date(b?.createdAt) - new Date(a?.createdAt)
    }
  )

  const getIcon = async currency => {
    const icon = await import(
      `../../../node_modules/cryptocurrency-icons/32/color/${currency.toLowerCase() ||
        'eth'}.png`
    )
    return icon?.default
  }

  const populateIcons = async item => {
    const found = iconManifest?.find(
      i => i?.symbol === item?.currency.toUpperCase()
    )
    let icon = null
    if (found) icon = await getIcon(item?.currency)
    return { ...item, icon }
  }

  const TableToShow = () => {
    const paginationItems = filteredDonations
    const [activeItem, setCurrentItem] = React.useState(1)
    const [currentItems, setCurrenItems] = React.useState([])

    useEffect(() => {
      const getItems = async () => {
        // Data to be rendered using pagination.
        const itemsPerPage = 6

        // Logic for displaying current items
        const indexOfLastItem = activeItem * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const tmpItems = paginationItems?.slice(
          indexOfFirstItem,
          indexOfLastItem
        )

        const items = await Promise.all(
          tmpItems.map(item => populateIcons(item))
        )

        setCurrenItems(items)
      }
      getItems()
    }, [activeItem, paginationItems])

    const handlePageChange = pageNumber => {
      setCurrentItem(pageNumber)
    }

    const copy = hash => {
      navigator.clipboard.writeText(hash)
    }

    return (
      <>
        <Table>
          <thead>
            <tr>
              {['Date', 'Project', 'Currency', 'Amount', 'Transaction'].map(
                (i, index) => {
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
                }
              )}
            </tr>
          </thead>
          <tbody>
            {currentItems
              ?.slice()
              .sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
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
                    <td
                      data-label='Project'
                      sx={{ variant: 'text.small', color: 'secondary' }}
                    >
                      <Text
                        sx={{
                          variant: 'text.medium',
                          color: 'primary',
                          cursor: 'pointer'
                        }}
                        onClick={() => navigate(`/project/${i?.project?.slug}`)}
                      >
                        {titleCase(i?.project?.title) || i?.donor}
                      </Text>
                    </td>
                    <td
                      data-label='Currency'
                      sx={{
                        variant: 'text.small',
                        color: 'secondary'
                      }}
                    >
                      <img
                        src={
                          i?.icon ||
                          `/assets/tokens/${i.currency.toUpperCase()}.png`
                        }
                        alt={i.currency}
                        onError={ev => {
                          ev.target.src = ETHIcon
                          ev.target.onerror = null
                        }}
                        style={{
                          width: '32px',
                          height: '32px',
                          marginLeft: '1rem'
                        }}
                      />
                    </td>
                    <td
                      data-label='Amount'
                      sx={{ variant: 'text.small', color: 'secondary' }}
                    >
                      <Text
                        sx={{
                          variant: 'text.small',
                          color: 'secondary'
                        }}
                      >
                        {i?.currency === 'ETH' && i?.valueUsd
                          ? `${
                              i?.amount ? `${i?.amount} ETH` : ''
                            } \n ~ USD $${i?.valueUsd?.toFixed(2)}`
                          : i?.amount}
                      </Text>
                    </td>
                    <td
                      data-label='Transaction'
                      sx={{ variant: 'text.small', color: 'secondary' }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'baseline'
                        }}
                      >
                        <Text
                          sx={{
                            variant: 'text.small',
                            color: 'secondary',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            width: '120px'
                          }}
                        >
                          {i?.transactionId}
                        </Text>
                        <FiCopy
                          size='18px'
                          sx={{ cursor: 'pointer', mr: 2 }}
                          onClick={() => copy(i?.transactionId)}
                        />{' '}
                        <FiExternalLink
                          size='18px'
                          sx={{ cursor: 'pointer' }}
                          onClick={() => {
                            window.open(
                              i?.transactionNetworkId === 100
                                ? `https://blockscout.com/xdai/mainnet/tx/${i?.transactionId}`
                                : `https://${etherscanPrefix}etherscan.io/tx/${i?.transactionId}`
                            )
                          }}
                        />
                      </div>
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
            No donations :(
          </Text>
        </Table>
      ) : (
        <TableToShow />
      )}
    </>
  )
}

export default MyDonations

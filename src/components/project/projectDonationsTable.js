/** @jsx jsx */
import React, { useEffect } from 'react'
import { ProjectContext } from '../../contextProvider/projectProvider'
import SearchIcon from '../../images/svg/general/search-icon.svg'
import styled from '@emotion/styled'
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
import Dropdown from '../dropdownInput'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import DropdownInput from '../dropdownInput'

dayjs.extend(localizedFormat)

// import Spinner from '../spinner'

const Table = styled.table`
  border-collapse: collapse;
  margin: 4rem 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;

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
      border-bottom: 3px solid #eaebee;
      display: block;
      margin-bottom: 0.625em;
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
const DonorBox = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const IconSearch = styled(SearchIcon)`
  margin-left: -2.5rem;
`
const SearchInput = styled(Flex)`
  width: 65%;
  align-items: center;
`
const FilterInput = styled(Flex)`
  width: 30%;
  align-items: center;
`

const FilterBox = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`

const CustomTable = () => {
  const { currentProjectView, setCurrentProjectView } = React.useContext(
    ProjectContext
  )
  // SPINNER EXAMPLEtoo
  // if (loading) {
  //   return (
  //     <Flex sx={{ justifyContent: 'center', pt: 5 }}>
  //       <Spinner variant='spinner.medium' />
  //     </Flex>
  //   )
  // }

  return (
    <>
      <FilterBox sx={{ pt: 4 }}>
        <FilterInput>
          <DropdownInput />
        </FilterInput>
        <SearchInput>
          <Input
            defaultValue=''
            placeholder='Search Donations'
            variant='forms.search'
          />
          <IconSearch />
        </SearchInput>
      </FilterBox>

      <Table>
        <thead>
          <tr>
            <th scope='col'>
              <Text
                sx={{
                  variant: 'text.small',
                  fontWeight: 'bold',
                  color: 'secondary'
                }}
              >
                Date
              </Text>
            </th>
            <th scope='col'>
              <Text
                sx={{
                  variant: 'text.small',
                  fontWeight: 'bold',
                  color: 'secondary'
                }}
              >
                Donor
              </Text>
            </th>
            <th scope='col'>
              <Text
                sx={{
                  variant: 'text.small',
                  fontWeight: 'bold',
                  color: 'secondary'
                }}
              >
                Currency
              </Text>
            </th>
            <th scope='col'>
              <Text
                sx={{
                  variant: 'text.small',
                  fontWeight: 'bold',
                  color: 'secondary'
                }}
              >
                Amount
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentProjectView?.donations?.map((i, key) => {
            return (
              <tr key={key}>
                <td
                  data-label='Account'
                  sx={{ variant: 'text.small', color: 'secondary' }}
                >
                  <Text sx={{ variant: 'text.small', color: 'secondary' }}>
                    {dayjs(i.createdAt).format('ll')}
                  </Text>
                </td>
                <DonorBox
                  data-label='Due Date'
                  sx={{ variant: 'text.small', color: 'secondary' }}
                >
                  <Avatar src='https://www.filepicker.io/api/file/4AYOKBTnS8yxt5OUPS5M' />
                  <Text
                    sx={{ variant: 'text.small', color: 'secondary', ml: 2 }}
                  >
                    {i.donor}
                  </Text>
                </DonorBox>
                <td
                  data-label='Amount'
                  sx={{ variant: 'text.small', color: 'secondary' }}
                >
                  <Badge variant='green'>{i.currency}</Badge>
                </td>
                <td
                  data-label='Period'
                  sx={{ variant: 'text.small', color: 'secondary' }}
                >
                  <Text sx={{ variant: 'text.small', color: 'secondary' }}>
                    {i.amount.toLocaleString('en-US', {
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
    </>
  )
}

export default CustomTable

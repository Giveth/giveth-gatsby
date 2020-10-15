import React from 'react'
import styled from '@emotion/styled'
import { Button, Flex, Text } from 'theme-ui'

const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 4rem 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;

  caption {
    font-size: 1.5em;
    margin: 0.5em 0 0.75em;
  }

  tr {
    border: 1px solid #ddd;
    padding: 0.35em;
  }

  th,
  td {
    padding: 0.625em;
    text-align: center;
  }

  th {
    font-size: 0.85em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
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
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: 0.625em;
    }

    td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: 0.8em;
      text-align: right;
    }

    td::before {
      content: attr(aria-label);
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }

    td:last-child {
      border-bottom: 0;
    }
  }
`
// TODO: CUSTOMIZE THIS

const CustomTable = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th scope='col'>Date</th>
          <th scope='col'>Donor</th>
          <th scope='col'>Currency</th>
          <th scope='col'>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label='Account'>01/01/2020</td>
          <td data-label='Due Date'>Anonymous</td>
          <td data-label='Amount'>USD</td>
          <td data-label='Period'>$1,190</td>
        </tr>
        <tr>
          <td data-label='Account'>01/01/2020</td>
          <td data-label='Due Date'>Anonymous</td>
          <td data-label='Amount'>USD</td>
          <td data-label='Period'>$1,190</td>
        </tr>
        <tr>
          <td data-label='Account'>01/01/2020</td>
          <td data-label='Due Date'>Anonymous</td>
          <td data-label='Amount'>USD</td>
          <td data-label='Period'>$1,190</td>
        </tr>
        <tr>
          <td data-label='Account'>01/01/2020</td>
          <td data-label='Due Date'>Anonymous</td>
          <td data-label='Amount'>USD</td>
          <td data-label='Period'>$1,190</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default CustomTable

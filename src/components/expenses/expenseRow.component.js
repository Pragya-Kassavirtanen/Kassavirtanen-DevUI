import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui'

const ExpenseRow = ({
  key,
  company_name,
  date_of_purchase,
  place_of_purchase,
  sum
}) =>
  <TableRow key={key}>
    <TableRowColumn>
      {company_name}
    </TableRowColumn>
    <TableRowColumn>
      {date_of_purchase}
    </TableRowColumn>
    <TableRowColumn>
      {place_of_purchase}
    </TableRowColumn>
    <TableRowColumn>
      {sum}
    </TableRowColumn>
  </TableRow>


export default ExpenseRow

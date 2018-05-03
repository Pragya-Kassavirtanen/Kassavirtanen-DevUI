import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui'

const AllowanceRow = ({
  key,
  company_name,
  start_date,
  end_date,
  sum
}) =>
  <TableRow key={key}>
    <TableRowColumn>
      {company_name}
    </TableRowColumn>
    <TableRowColumn>
      {start_date}
    </TableRowColumn>
    <TableRowColumn>
      {end_date}
    </TableRowColumn>
    <TableRowColumn>
      {sum}
    </TableRowColumn>
  </TableRow>


export default AllowanceRow

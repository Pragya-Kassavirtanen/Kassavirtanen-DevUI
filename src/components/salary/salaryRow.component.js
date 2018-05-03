import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui'

const SalaryRow = ({
  key,
  date,
  gross_sum,
  net_sum,
  service_cost,
  allowance_cost,
  expense_cost
}) =>
  <TableRow key={key}>
    <TableRowColumn>
      {date}
    </TableRowColumn>
    <TableRowColumn>
      {gross_sum}
    </TableRowColumn>
    <TableRowColumn>
      {net_sum}
    </TableRowColumn>
    <TableRowColumn>
      {service_cost}
    </TableRowColumn>
    <TableRowColumn>
      {allowance_cost}
    </TableRowColumn>
    <TableRowColumn>
      {expense_cost}
    </TableRowColumn>
  </TableRow>


export default SalaryRow

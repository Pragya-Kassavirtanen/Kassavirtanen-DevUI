import React from 'react'

import {
  Table,
  TableHeader,
  TableBody,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from  'material-ui'

export default class SummaryTableComponent extends React.Component {

  render() {
    return <SummaryTable {...this.props}/>
  }
}

const SummaryTable = ({
    allowanceCost,
    fullTimeSelected,
    partTimeSelected,
    mealSelected,
    kmPrice,
    distance
  }) =>

<div>
  <div className="dashboard-invoice-add">
    <Table selectable={false}>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow className="dashboard-invoice-inputrow">
          <TableHeaderColumn>Korvaus</TableHeaderColumn>
          <TableHeaderColumn>Määrä</TableHeaderColumn>
          <TableHeaderColumn>Summa</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        <TableRow>
          <TableRowColumn>
            Kokopäiväraha
          </TableRowColumn>
          <TableRowColumn>
            {fullTimeSelected}
          </TableRowColumn>
          <TableRowColumn>
            {new Intl.NumberFormat('fi-FI', {
              style: 'currency',
              currency: 'EUR'
            }).format(fullTimeSelected * (!!allowanceCost ? allowanceCost.full_time_allowance.value : 0))}
          </TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>
            Osapäiväraha
          </TableRowColumn>
          <TableRowColumn>
            {partTimeSelected}
          </TableRowColumn>
          <TableRowColumn>
            {new Intl.NumberFormat('fi-FI', {
              style: 'currency',
              currency: 'EUR'
            }).format(partTimeSelected * (!!allowanceCost ? allowanceCost.part_time_allowance.value : 0))}
          </TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>
            Ateriakorvaus
          </TableRowColumn>
          <TableRowColumn>
            {mealSelected}
          </TableRowColumn>
          <TableRowColumn>
            {new Intl.NumberFormat('fi-FI', {
              style: 'currency',
              currency: 'EUR'
            }).format(mealSelected * (!!allowanceCost ? allowanceCost.meal_allowance.value : 0))}
          </TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>
            Kilometrikorvaus
          </TableRowColumn>
          <TableRowColumn>
            {distance}
          </TableRowColumn>
          <TableRowColumn>
            {new Intl.NumberFormat('fi-FI', {
              style: 'currency',
              currency: 'EUR'
            }).format(kmPrice * Number.parseFloat(distance) || 0)}
          </TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>
            Yhteensä
          </TableRowColumn>
          <TableRowColumn>
          </TableRowColumn>
          <TableRowColumn>
            {new Intl.NumberFormat('fi-FI', {
              style: 'currency',
              currency: 'EUR'
            }).format((fullTimeSelected * (!!allowanceCost ? allowanceCost.full_time_allowance.value : 0))
                      + (partTimeSelected * (!!allowanceCost ? allowanceCost.part_time_allowance.value : 0)) +
                      (mealSelected * (!!allowanceCost ? allowanceCost.meal_allowance.value : 0)) +
                      (kmPrice * Number.parseFloat(distance) || 0))}
          </TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</div>

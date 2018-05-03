import React from 'react'

import {
  Table,
  TableBody,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from  'material-ui'

export default class NewSalarySelectComponent extends React.Component {

  componentWillMount() {
    this.props.getNewSalaryStart()
    this.props.selectRowSalary([])
  }

  render() {
    return <NewSalarySelect {...this.props}/>
  }
}

const NewSalarySelect = ({
  newSalary,
  selectRowSalary
}) =>
<div className="panel-body">
  <Table multiSelectable={true} onRowSelection={selectRowSalary}>
    <TableHeader adjustForCheckbox={true} displaySelectAll={false}>
      <TableRow>
        <TableHeaderColumn>Lasku</TableHeaderColumn>
        <TableHeaderColumn>Yritys</TableHeaderColumn>
        <TableHeaderColumn>Summa</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody deselectOnClickaway={false}>
      {newSalary.map(element =>
        <TableRow className="dashboard-admin-hover-row" key={element.id}>
          <TableRowColumn>{element.id}</TableRowColumn>
          <TableRowColumn>{element.company_name}</TableRowColumn>
          <TableRowColumn>{new Intl.NumberFormat('fi-FI', {
                            style: 'currency',
                            currency: 'EUR'
                          }).format(element.total_sum)}
          </TableRowColumn>
        </TableRow>
      )}
    </TableBody>
  </Table>
</div>

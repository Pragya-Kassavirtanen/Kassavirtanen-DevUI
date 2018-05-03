import React from 'react'
import { Table, TableRow, TableHeader, TableHeaderColumn, TableBody, RaisedButton } from  'material-ui'

const InvoiceInputTable =  ({ rows, addInvoiceRow }) =>
  <div className="panel-body">
    <div>
      <Table selectable={false} >
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Kuvaus</TableHeaderColumn>
            <TableHeaderColumn>Aloituspvm.</TableHeaderColumn>
            <TableHeaderColumn>Lopetuspvm</TableHeaderColumn>
            <TableHeaderColumn>Määrä</TableHeaderColumn>
            <TableHeaderColumn>Yksikkö</TableHeaderColumn>
            <TableHeaderColumn>á hinta</TableHeaderColumn>
            <TableHeaderColumn>ALV %</TableHeaderColumn>
            <TableHeaderColumn>Yhteensä (veroton) </TableHeaderColumn>
            <TableHeaderColumn>Poista</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {rows}
        </TableBody>
      </Table>
    </div>
    <div className="dashboard-invoice-add pull-right">
      <RaisedButton label="Lisää uusi rivi"
                    primary={true}
                    onClick={ addInvoiceRow }/>
    </div>
  </div>

export default InvoiceInputTable

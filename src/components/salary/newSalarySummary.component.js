import React from 'react'

import {
  Table,
  TableBody,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  RaisedButton
} from  'material-ui'


export default class NewSalarySummaryComponent extends React.Component {
  render() {
    return <NewSalarySummary {...this.props}/>
  }
}

const NewSalarySummary = ({
  newSalarySummary,
  taxPercent,
  postSalary,
  salaries
}) =>
  <div className="dashboard-content-header">
    <div className="col-md-6 col-sm-6">
      <div className="panel panel-default">
        <div className="panel-heading">
          Laskettu palkka
        </div>
        <div className="panel-body">
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><div className="dashboard-salary-header">Laskutus</div></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>Summa</TableRowColumn>
                <TableRowColumn>{new Intl.NumberFormat('fi-FI', {
                                  style: 'currency',
                                  currency: 'EUR'
                                }).format(newSalarySummary.total_sum)}
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          <hr/>
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><div className="dashboard-salary-header">Maksut ja kulut</div></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>Palvelumaksu</TableRowColumn>
                <TableRowColumn>{new Intl.NumberFormat('fi-FI', {
                                  style: 'currency',
                                  currency: 'EUR'
                                }).format(newSalarySummary.service_cost)}
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          <hr/>
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><div className="dashboard-salary-header">Palkka</div></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>Palkanlaskennan aloitussumma</TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalarySummary.salary_sum)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Työnantajakulut</TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalarySummary.employer_cost)}
                  </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn><b>Bruttopalkka</b></TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalarySummary.gross_sum)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Työntekijän pidätykset {taxPercent*100}%</TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalarySummary.tax)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Matka- ja päivärahakorvaukset</TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalarySummary.allowances_cost)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Kulukorvaukset</TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalarySummary.expenses_cost)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn><b>Nettopalkka</b></TableRowColumn>
                <TableRowColumn>
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalarySummary.net_sum)}
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          <hr/>
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><div className="dashboard-salary-header">Muut kulut</div></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>YEL-vakuutus</TableRowColumn>
                <TableRowColumn>0 £</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          <hr/>
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><div className="dashboard-salary-header">Maksetaan tilille</div></TableHeaderColumn>
                <TableHeaderColumn><div className="dashboard-salary-header">
                  {new Intl.NumberFormat('fi-FI', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(newSalarySummary.paid_sum)}
                </div></TableHeaderColumn>
              </TableRow>
            </TableHeader>
          </Table>

        </div>
      </div>
    </div>
    <div className="pull-right">
      <RaisedButton type="submit" label="Maksa palkka >>" primary={true} onClick={() => postSalary(salaries)}/>
    </div>
  </div>

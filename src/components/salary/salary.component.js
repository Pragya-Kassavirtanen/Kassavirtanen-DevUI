import React from 'react'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow
} from  'material-ui'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import PaySalaryContainer from '../../containers/salary/paySalary.container'

/**
 * @author  Kristian Lauttamus
 */

export default class NewSalaryComponent extends React.Component {
    render() {
        return <Salary {...this.props}/>
    }
}

const Salary = ({salaryRows}) =>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="container-fluid">
            <div className="row">
                <div className="dashboard-content-header">
                    <h1>Maksetut palkat</h1>
                </div>
            </div>
            <div className="row">
                <div className="dashboard-content-header">
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="dashboard-content-header">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <Table selectable={false}>
                                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                        <TableRow>
                                            <TableHeaderColumn>Päivämäärä</TableHeaderColumn>
                                            <TableHeaderColumn>Bruttopalkka</TableHeaderColumn>
                                            <TableHeaderColumn>Nettopalkka</TableHeaderColumn>
                                            <TableHeaderColumn>Palvelumaksu</TableHeaderColumn>
                                            <TableHeaderColumn>Matkakorvaus</TableHeaderColumn>
                                            <TableHeaderColumn>Kulukorvaus</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                      {salaryRows}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
              <PaySalaryContainer/>
            </div>
          {/*
            <div className="row">
                <div className="dashboard-content-header">
                    <h1>Yhteenvedot palkoista</h1>
                </div>
            </div>
            <div className="row">
                <div className="dashboard-content-header">
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="dashboard-content-header">
                    <div className="col-md-12">
                        <div className="col-md-6">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    Yhteensä
                                </div>
                                <div className="panel-body">
                                    <Table selectable={false}>
                                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                            <TableRow>
                                                <TableHeaderColumn>Brutto</TableHeaderColumn>
                                                <TableHeaderColumn>Netto</TableHeaderColumn>
                                                <TableHeaderColumn>Ennakonpidätys</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow>
                                                <TableRowColumn>0€</TableRowColumn>
                                                <TableRowColumn>0€</TableRowColumn>
                                                <TableRowColumn>0€</TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    2017
                                </div>
                                <div className="panel-body">
                                    <Table selectable={false}>
                                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                            <TableRow>
                                                <TableHeaderColumn>Brutto</TableHeaderColumn>
                                                <TableHeaderColumn>Netto</TableHeaderColumn>
                                                <TableHeaderColumn>Ennakonpidätys</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow>
                                                <TableRowColumn>0€</TableRowColumn>
                                                <TableRowColumn>0€</TableRowColumn>
                                                <TableRowColumn>0€</TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        */}
        </div>
    </MuiThemeProvider>

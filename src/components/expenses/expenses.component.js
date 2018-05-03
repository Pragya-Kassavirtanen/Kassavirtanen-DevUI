import React from 'react'

import { Link } from 'react-router'

import {
  RaisedButton,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  Divider
} from  'material-ui'

import ReactPaginate from 'react-paginate'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

/**
 * @author  PHZ-developers
 */

export default class NewExpensesComponent extends React.Component {

  componentWillMount() {
    this.props.loadAllowanceCost()
    this.props.getInvoicesStart()
    this.props.getExpenseStart()
  }

  render() {
    return <NewExpenses {...this.props}/>
  }
}

const _onFormSubmit = (values) => {
  console.log(values)
}

const NewExpenses = ({
  expenseRow,
  handleSubmit,
  expensePages,
  expensePageChange,
  allowancePages,
  allowancePageChange,
  allowanceRow
}) =>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid">
      <div className="row">
        <div className="dashboard-content-header">
          <h1>Kulukorvaukset</h1>
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr/>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-xs-12 col-sm-12 col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Luomasi kululaskut</h3>
              </div>
              <div className="panel-body">
                {createdExpenseRows(expenseRow, expensePages, expensePageChange)}
              </div>
              <div className="panel-footer is-plain clearfix">
                <div className="button-pull">
                  <RaisedButton label="+ Luo uusi kululasku"
                                primary={true}
                                type="submit"
                                containerElement={<Link to="/dashboard/fee/newfee"/>}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <h1>Matka- ja päivärahakorvaukset</h1>
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr/>
      </div>
      <form onSubmit={handleSubmit(_onFormSubmit)}>
        <div className="row">
          <div className="dashboard-content-header">
            <div className="col-xs-12 col-sm-12 col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Luomasi laskut</h3>
                </div>
                <div className="panel-body">
                  {createdAllowanceRows(allowanceRow, allowancePages, allowancePageChange)}
                </div>
                <div className="panel-footer is-plain clearfix">
                  <div className="button-pull">
                    <RaisedButton label="+ Luo uusi matkakorvaus"
                                  primary={true}
                                  type="submit"
                                  containerElement={<Link to="/dashboard/fee/newallowance"/>}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </MuiThemeProvider>

const createdExpenseRows = (expenseRow, expensePages, expensePageChange) =>
  <div>
    <Table selectable={false} >
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Laskun asiakas</TableHeaderColumn>
          <TableHeaderColumn>Osto pvm</TableHeaderColumn>
          <TableHeaderColumn>Ostopaikka</TableHeaderColumn>
          <TableHeaderColumn>Summa</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {expenseRow}
      </TableBody>
    </Table>
    <Divider />
    <ReactPaginate
      previousLabel={<i className='fa fa-chevron-left'/>}
      nextLabel={<i className='fa fa-chevron-right'/>}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={expensePages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={expensePageChange}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'} />
  </div>

const createdAllowanceRows = (allowanceRow, allowancePages, allowancePageChange) =>
  <div>
    <Table selectable={false} >
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Laskun asiakas</TableHeaderColumn>
          <TableHeaderColumn>Aloituspvm</TableHeaderColumn>
          <TableHeaderColumn>Loppupvm</TableHeaderColumn>
          <TableHeaderColumn>Summa</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {allowanceRow}
      </TableBody>
    </Table>
    <Divider />
    <ReactPaginate
      previousLabel={<i className='fa fa-chevron-left'/>}
      nextLabel={<i className='fa fa-chevron-right'/>}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={allowancePages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={allowancePageChange}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'} />

  </div>


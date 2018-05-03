import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import store from './store'
import Main from './containers/main.container'
//import Login from './containers/login.container'

import Login from './components/account/login.component'

import Register from './containers/register.container'
import Callback from './containers/callback.container'
import Invoice from './containers/invoice/invoice.container'
import Salary from './containers/salary/salary.container'
import Customer from './containers/customer/customer.container'
import ReviewInvoice from './containers/invoice/reviewInvoice.container'
import Dashboard from './containers/dashboard.container'
import Profile from './containers/profile/profile.container'
import Tax from './containers/tax/tax.container'
import Expenses from './containers/expenses/expenses.container'
import NewExpense from './containers/expenses/newExpense.container'
import InvoiceEdit from './containers/invoice/invoiceEdit.container'
import NewAllowance from './containers/expenses/newAllowance.container'
import Admin from './containers/admin/admin.container'



/**
 * TODO: Describe me
 *
 * @author  Skylar Kong
 *
 */

const history = syncHistoryWithStore(browserHistory, store)


const isUserAuthenticated = UserAuthWrapper({
  authSelector: state => state.oidc.user ? state.oidc.user : (store.getState()).client.user,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'isUserAuthenticated'
})

export default class RouteComponent extends React.Component {

  render () {

    return (
      <Router history={history}>
        <Route path="/dashboard" component={Main}>
          <Route path="/dashboard/login" component={Login}/>
          <Route path="/dashboard/register" component={Register}/>
          <Route path="/dashboard/callback" component={Callback}/>
          <Route path="/dashboard/main" component={isUserAuthenticated(Dashboard)} />
          <Route path="/dashboard/invoice" component={isUserAuthenticated(Invoice)}/>
          <Route path="/dashboard/invoice/review" components={isUserAuthenticated(ReviewInvoice)}/>
          <Route path="/dashboard/salary" component={isUserAuthenticated(Salary)}/>
          <Route path="/dashboard/customer" components={isUserAuthenticated(Customer)}/>
          <Route path="/dashboard/tax" component={isUserAuthenticated(Tax)}/>
          <Route path="/dashboard/profile" component={isUserAuthenticated(Profile)}/>
          <Route path="/dashboard/fee" component={isUserAuthenticated(Expenses)}/>
          <Route path="/dashboard/fee/newfee" component={isUserAuthenticated(NewExpense)}/>
          <Route path="/dashboard/fee/newallowance" component={isUserAuthenticated(NewAllowance)}/>
          <Route path="/dashboard/invoice/edit" component={isUserAuthenticated(InvoiceEdit)}/>
          <Route path="/dashboard/admin" component={isUserAuthenticated(Admin)}/>
        </Route>
        <Route path="/dashboard/*" component={Main}/>
      </Router>
    )
  }
}

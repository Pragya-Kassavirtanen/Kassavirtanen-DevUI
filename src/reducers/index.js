import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { reducer as oidcReducer } from 'redux-oidc'

import invoiceReducer from './invoice.reducer'
import invoiceReviews from './invoiceReview.reducer'
import customerReducer from './customer.reducer'
import expenseReducer from './expense.reducer'
import profileReducer from './profile.reducer'
import taxReducer from './tax.reducer'
import adminReducer from './admin.reducer'
import salaryReducer from './salary.reducer'
import registerForm from './register.reducer'
import loginForm from './login.reducer'
import clientReducer from './client.reducer'

/**
 * TODO: describe this
 *
 * @author Skylar Kong
 */


const reducers = combineReducers({

  form: reduxFormReducer,
  oidc: oidcReducer,
  routing: routerReducer,
  invoice: invoiceReducer,
  invoiceReviews: invoiceReviews,
  customer: customerReducer,
  expense: expenseReducer,
  profile: profileReducer,
  tax: taxReducer,
  admin: adminReducer,
  salary: salaryReducer,
  register: registerForm,
  login: loginForm,
  client: clientReducer
})

export default reducers

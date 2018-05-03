import {
  CHANGE_ADMIN_MENU,
  SEARCH_ADMIN_INVOICE_SUCCESS,
  SEARCH_ADMIN_INVOICE_FAILED,
  EXPAND_ADMIN_INVOICE_TRUE,
  EXPAND_ADMIN_INVOICE_FALSE,
  EXPAND_ADMIN_USER_TRUE,
  EXPAND_ADMIN_USER_FALSE,
  SEARCH_ADMIN_USERS_SUCCESS,
  SEARCH_ADMIN_USERS_FAILED,
  UPDATE_ADMIN_INVOICE,
  UPDATE_ADMIN_INVOICE_RESULT,
  HIDE_ADMIN_SNACKBAR,
  UPDATE_ADMIN_USER,
  UPDATE_ADMIN_USER_RESULT
} from '../constants'

import DateTimeFormat from '../utils/DateTimeFormat'

import { convertIntToState } from '../utils/invoice.utils'

const initialState = {
  selectedMenuItem: 0,
  showSpinner: false,
  showAdminSnackbar: false,
  invoiceSearchRows: [],
  userSearchRows: []
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {

    case CHANGE_ADMIN_MENU:
      return Object.assign({}, {...state}, {selectedMenuItem: action.value})

    case SEARCH_ADMIN_INVOICE_SUCCESS:
      const newInvoiceRows = []
      for (let row of action.result) {
        newInvoiceRows.push({...row, expanded: false})
      }
      return Object.assign({}, {...state}, {invoiceSearchRows: newInvoiceRows})

    case SEARCH_ADMIN_INVOICE_FAILED:
      return Object.assign({}, {...state}, {})

    case SEARCH_ADMIN_USERS_SUCCESS:
      const newUserRows = []
      for (let row of action.result.data) {
        newUserRows.push({...row, expanded: false})
      }
      return Object.assign({}, {...state}, {userSearchRows: newUserRows})

    case SEARCH_ADMIN_USERS_FAILED:
      return Object.assign({}, {...state}, {})

    case EXPAND_ADMIN_INVOICE_TRUE:

      let result = action.result.data
      const updateRows = []
      for (let row of state.invoiceSearchRows) {

        if(row.id == result.id) {
          result.state = convertIntToState(result.state)

          result.due_date = new DateTimeFormat('fi', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
          }).format(new Date(result.due_date))

          result.billing_date = new DateTimeFormat('fi', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
          }).format(new Date(result.billing_date))

          result.total_sum = new Intl.NumberFormat('fi-FI', {
            style: 'currency',
            currency: 'EUR'
          }).format(result.total_sum)


          updateRows.push({...row, expanded: true, expandData: result})
        } else updateRows.push({...row})
      }
      return Object.assign({}, {...state}, {invoiceSearchRows: updateRows})

    case EXPAND_ADMIN_INVOICE_FALSE:
      const closeUpdateRows = []
      for (let row of state.invoiceSearchRows) {
        row.id == action.id
          ? closeUpdateRows.push({...row, expanded: false, expandData: null})
          : closeUpdateRows.push({...row})
      }
      return Object.assign({}, {...state}, {invoiceSearchRows: closeUpdateRows})

    case EXPAND_ADMIN_USER_TRUE:
      let userResult = action.result.data
      const updateUserRows = []
      for (let row of state.userSearchRows) {
        if(row.email == userResult.email) {
          updateUserRows.push({...row, expanded: true, expandData: userResult})
        } else updateUserRows.push({...row})
      }
      return Object.assign({}, {...state}, {userSearchRows: updateUserRows})

    case EXPAND_ADMIN_USER_FALSE:
      const closeUserUpdateRows = []
      for (let row of state.userSearchRows) {
        row.uuid == action.uuid
          ? closeUserUpdateRows.push({...row, expanded: false, expandData: null})
          : closeUserUpdateRows.push({...row})
      }
      return Object.assign({}, {...state}, {userSearchRows: closeUserUpdateRows})

    case UPDATE_ADMIN_INVOICE:
      return Object.assign({}, {...state}, {showSpinner: true})

    case UPDATE_ADMIN_INVOICE_RESULT:
      return Object.assign({}, {...state}, {showSpinner: false, showAdminSnackbar: true})

    case UPDATE_ADMIN_USER:
      return Object.assign({}, {...state}, {showSpinner: true})

    case UPDATE_ADMIN_USER_RESULT:
      return Object.assign({}, {...state}, {showSpinner: false, showAdminSnackbar: true})

    case HIDE_ADMIN_SNACKBAR:
      return Object.assign({}, {...state}, {showAdminSnackbar: false})

    default:
      return state
  }

}

export default adminReducer

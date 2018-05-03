import React from 'react'

import { connect } from 'react-redux'
import { reduxForm, change, getFormValues } from 'redux-form'

import { MenuItem } from 'material-ui'

import NewExpenseComponent from '../../components/expenses/newExpense.component'
import DateTimeFormat from '../../utils/DateTimeFormat'

import { expenseValidate as validate } from '../validate'

import {
  addExpenseRow,
  saveExpense,
  closeExpenseSnackBar
} from '../../actions/index'

const date = new Date()
let newExpenseContainer = reduxForm({
  form: 'newfee',
  destroyOnUnmount: false,
  initialValues: {
    invoice: '',
    place_of_purchase: '',
    date_of_purchase: new DateTimeFormat('fi', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).format(date),
    expenseInputRow: [{
      description0: '',
      sum0: '',
      vat0: 24
    }],
    receipt_picture: ''
  },
  validate
}
)(NewExpenseComponent)

const mapStateToProps = (state) => {

  const formValues = getFormValues('newfee')(state)

  const expenseInputRow = state.expense.expenseInputRow
  expenseInputRow.forEach(el => {
    if (!formValues['expenseInputRow'][el.key]) {
      formValues['expenseInputRow'][el.key] = {}
      formValues['expenseInputRow'][el.key][`vat${el.key}`] = 24
    }
  })


    const invoiceNames = state.invoice.invoices.map((item, index) =>
    <MenuItem key={index} value={item} primaryText={item.company_name + ' ' + new DateTimeFormat('fi', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }).format(new Date(item.due_date)) + ' ' + item.total_sum + '€'}/>)
  return {
    user: state.oidc.user,
    invoices: invoiceNames,
    expenseRows: state.expense.expenseInputRow,
    showSpinner: state.expense.showSpinner,
    showSnackbar: state.expense.showSnackbar
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addExpenseRow: () => dispatch(addExpenseRow()),
    saveExpense: () => dispatch(saveExpense()),
    expensePictureUpload: fileName => dispatch(change('newfee', 'receipt_picture', fileName)),
    closeSnackbar: () => dispatch(closeExpenseSnackBar())
  }
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign({}, stateProps, dispatchProps, ownProps)

newExpenseContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(newExpenseContainer)

export default newExpenseContainer

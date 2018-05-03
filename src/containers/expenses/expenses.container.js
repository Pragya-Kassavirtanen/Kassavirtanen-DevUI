import { connect } from 'react-redux'
import { reduxForm} from 'redux-form'

import NewExpensesComponent from '../../components/expenses/expenses.component'

import { getInvoicesStart, getExpenseStart, expensePageChange, allowancePageChange, loadAllowanceCost } from '../../actions/index'

/**
 * The high order container for the invoice component
 *
 * @author  Skylar Kong
 *
 */

let NewExpensesComponentContainer = reduxForm({
  form: 'expense'
})(NewExpensesComponent)

// To be called every time when the store is updated
const mapStateToProps = (state) => {
  return {
    user: state.oidc.user,
    expenseRow: state.expense.expenseRow,
    expensePages: Math.ceil(state.expense.expenses.length / 10),
    allowanceRow: state.expense.allowanceRow,
    allowancePages: Math.ceil(state.expense.allowances.length / 10)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadAllowanceCost: () => dispatch(loadAllowanceCost()),
    getInvoicesStart: () => dispatch(getInvoicesStart()),
    getExpenseStart: () => dispatch(getExpenseStart()),
    expensePageChange: selected => dispatch(expensePageChange(selected)),
    allowancePageChange: selected => dispatch(allowancePageChange(selected))
  }
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign({}, stateProps, dispatchProps, ownProps)

NewExpensesComponentContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(NewExpensesComponentContainer)

export default NewExpensesComponentContainer

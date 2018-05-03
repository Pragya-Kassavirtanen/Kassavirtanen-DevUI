import{ connect } from 'react-redux'
import AdminSalaryFilterRow from '../../components/admin/adminSalaryFilterRow.component'
import { reduxForm } from 'redux-form'

let AdminSalaryFilterRowContainer = reduxForm({
  form: 'admin'
})(AdminSalaryFilterRow)

const mapStateToProps = state => {
  return {
    state
  }
}


const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign({}, stateProps, dispatchProps, ownProps)

AdminSalaryFilterRowContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AdminSalaryFilterRowContainer)

export default AdminSalaryFilterRowContainer

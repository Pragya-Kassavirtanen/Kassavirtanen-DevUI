import{ connect } from 'react-redux'
import AdminInvoiceFilterRow from '../../components/admin/adminInvoiceFilterRow.component'
import { reduxForm } from 'redux-form'
import { searchAdminInvoice } from '../../actions/index'

let AdminInvoiceFilterRowContainer = reduxForm({
  form: 'admin'
})(AdminInvoiceFilterRow)

const mapStateToProps = state => {
  return {
    state
  }
}


const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    searchAdminInvoice: () => dispatch(searchAdminInvoice())
  }
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign({}, stateProps, dispatchProps, ownProps)

AdminInvoiceFilterRowContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AdminInvoiceFilterRowContainer)

export default AdminInvoiceFilterRowContainer

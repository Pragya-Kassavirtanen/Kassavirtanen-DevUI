import{ connect } from 'react-redux'
import AdminInvoiceForm from '../../components/admin/adminInvoiceForm.component'
import { reduxForm } from 'redux-form'
import { updateAdminInvoice } from '../../actions/index'

let AdminInvoiceFormContainer = reduxForm({
  fields: [
    'invoice_reference',
    'description',
    'total_sum',
    'due_date',
    'billing_date',
    'state',
    'delivery_method',
    'job_title'
  ]
})(AdminInvoiceForm)

const mapStateToProps = state => {
  return {
    state
  }
}


const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    updateAdminInvoice: id => dispatch(updateAdminInvoice(id))
  }
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign({}, stateProps, dispatchProps, ownProps)

AdminInvoiceFormContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AdminInvoiceFormContainer)

export default AdminInvoiceFormContainer

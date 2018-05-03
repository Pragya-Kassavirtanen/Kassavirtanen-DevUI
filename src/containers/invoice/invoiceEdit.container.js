import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import InvoiceEditComponent from '../../components/invoice/invoiceEdit.component'

import { profileValidate as validate } from '../validate'
import { profileAsyncValidate as asyncValidate } from '../asyncValidate'

let InvoiceEditContainer = reduxForm({
  form: 'invoiceEdit',
  validate,
  asyncValidate
})(InvoiceEditComponent)

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


InvoiceEditContainer = connect(mapStateToProps, mapDispatchToProps)(InvoiceEditContainer)

export default InvoiceEditContainer

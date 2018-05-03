import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { loadInvoiceReview, saveAndSendInvoice, closeInvoiceReviewSnackBar, saveInvoiceDraft } from '../../actions'
import { formatFiToISO } from '../../utils/DateTimeFormat'

import ReviewInvoice from '../../components/invoice/reviewInvoice.component'

import DateTimeFormat from '../../utils/DateTimeFormat'

let ReviewInvoceContainer = reduxForm({
  form: 'invoiceReview',
  destroyOnUnmount: false,
  initialValues: {
    delivery_method: 'Sähköposti'
  }
})(ReviewInvoice)

const mapStateToProps = (state) => {
  let formInvoice = getFormValues('invoice')(state)
  const formInvoiceReview = getFormValues('invoiceReview')(state)

  formInvoice[Symbol.iterator] = function* () {
    const keys = Reflect.ownKeys(this)
    for (const key of keys) {
      (key ===  'billing_date') ? yield [key,
        new DateTimeFormat('fi', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        }).format(this[key])] :
      yield [key, this[key]]
    }
  }

  //fix the invalid input from user when validation with date picker fails
  for (let row of Object.keys(formInvoice['rows'])) {
    if(formInvoice['rows'][row][`description${row}`] === undefined) {
      delete formInvoice['rows'][row]
    } else {
      if(typeof formInvoice['rows'][row][`start_date${row}`] === 'string') {
        formInvoice['rows'][row][`start_date${row}`] = new Date(formatFiToISO(formInvoice['rows'][row][`start_date${row}`].split('.')))}
      if(typeof formInvoice['rows'][row][`end_date${row}`] === 'string') {
        formInvoice['rows'][row][`end_date${row}`] = new Date(formatFiToISO(formInvoice['rows'][row][`end_date${row}`].split('.')))
      }
    }
  }

  for (const [key, value] of formInvoice) {
    formInvoiceReview[key] = value
  }

  const review = state.invoiceReviews

  return {
    apiFailed: review.apiFailed,
    apiSuccess: review.apiSuccess,
    showSpinner: review.showSpinner,
    invoiceRows: review.reviewRows,
    formValues: formInvoiceReview
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadInvoiceReview: () => dispatch(loadInvoiceReview()),
    saveAndSendInvoice: () => dispatch(saveAndSendInvoice()),
    saveInvoiceDraft: () => dispatch(saveInvoiceDraft()),
    closeSnackbar: () => dispatch(closeInvoiceReviewSnackBar())
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign({}, stateProps, dispatchProps, ownProps)

ReviewInvoceContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ReviewInvoceContainer)

export default ReviewInvoceContainer

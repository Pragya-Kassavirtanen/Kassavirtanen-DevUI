import React from 'react'
import { LOAD_INVOICE_REVIEW,
         SAVE_INVOICE_SUCCESS,
         SAVE_INVOICE_FAILED,
         CLOSE_INVOICE_REVIEW_SNACKBAR,
         SAVE_AND_SEND_INVOICE,
         SAVE_INVOICE_DRAFT
} from '../constants'
import { getFormValues } from 'redux-form'
import ReviewInvoiceRow from '../components/invoice/reviewInvoiceRow.component'
import store from '../store'

const reviewInvoice = (state = { apiSuccess: false, apiFailed: false, showSpinner: false }, action) => {
  switch (action.type) {

    case LOAD_INVOICE_REVIEW:

      const invoiceInputRows = (store.getState()).invoice.invoiceInputRows
      const form = getFormValues('invoice')(store.getState())
      for (let row of Object.keys(invoiceInputRows)) {
        if(!Object.keys(form.rows).includes(invoiceInputRows[row].key)) {
          delete invoiceInputRows[row]
        }
      }
      const reviewRows = invoiceInputRows.map((el) => <ReviewInvoiceRow key={el.key} {...el.props} />)

      return Object.assign( {}, state, {
        reviewRows: reviewRows
      } )

    case SAVE_AND_SEND_INVOICE:
      return Object.assign({}, state, { showSpinner: true })

    case SAVE_INVOICE_SUCCESS:
      return Object.assign({}, state, { showSpinner: false, apiSuccess: true })

    case SAVE_INVOICE_FAILED:
      return Object.assign({}, state, { showSpinner: false, apiSuccess: true  })

    case CLOSE_INVOICE_REVIEW_SNACKBAR:
      return Object.assign({}, state, { apiSuccess: false, apiFailed: false })

    case SAVE_INVOICE_DRAFT:
        return Object.assign({}, state, { showSpinner: true })
    default:
      return state
  }
}

export default reviewInvoice

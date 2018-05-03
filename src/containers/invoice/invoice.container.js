import { connect } from 'react-redux'
import { reduxForm, getFormValues, change } from 'redux-form'

import NewInvoice from '../../components/invoice/invoice.component'

import { invoiceValidate as validate } from '../validate'

import {
  addInvoiceRow,
  removeInvoiceRow,
  getInvoicesStart,
  onInvoiceReview,
  invoicePageChange,
  changeInvoiceBillingDate
} from '../../actions'
import DateTimeFormat from '../../utils/DateTimeFormat'
import {
  countryItems, invoiceItems, unitItems, overdueItems, titleItems, alvItems, alvPercentageItems
} from '../../utils/invoice.utils'

/**
 * The high order container for the invoice component
 *
 * @author  Skylar Kong
 *
 */

let date = new Date()
let NewInvoiceContainer = reduxForm({
  form: 'invoice',
  destroyOnUnmount: false,
  initialValues: {
    country: 'Suomi',
    delivery_method: 'Sähköposti',
    delivery_address: '',
    invoice_reference: '',
    person_to_contact: '',
    person_to_contact_email: '',
    overdue: 14,
    workDescription: 'Valitse ammattinimike',
    rows: {
      0: {
        quantity0: '0',
        quantity_price0: '0',
        vat_percent0: 24,
        description0: '',
        unit0: 'kpl',
        sum_tax_free0: new Intl.NumberFormat('fi-FI', {
          style: 'currency',
          currency: 'EUR'
        }).format(0)
      }
    },
    finvoice_address: '',
    finvoice_operator: '',
    description: '',
    customer: '',
    web_invoice: '',
    job_title: '',
    zip_code: '',
    city: '',
    company_name: '',
    business_id: '',
    state: 1,
    salary_status: '',
    billing_date: new Date(),
    due_date: new DateTimeFormat('fi', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).format(date.setDate(date.getDate() + 14)),
    instant_payment: false
  },
  validate
})(NewInvoice)

// To be called every time when the store is updated
const mapStateToProps = (state) => {

  const formValues = getFormValues('invoice')(state)
  const invoiceInputRows = state.invoice.invoiceInputRows
  const billingDate = !!state.invoice.billing_date ? state.invoice.billing_date : new Date()
  formValues.billing_date = billingDate
  formValues.due_date = dueDate(formValues.overdue, billingDate)
  // FIXME: TO BE REFACTORED
  let totalSum = 0

  for(let r of Object.keys(formValues['rows'])) {
    !invoiceInputRows.reduce((sum, value) => {
      return value.key === r || sum
    }, false) && delete formValues['rows'][r]
  }

  invoiceInputRows.forEach(el => {
    if (!formValues['rows'][el.key]) {
      formValues['rows'][el.key] = {}
      formValues['rows'][el.key][`description${el.key}`] = ''
      formValues['rows'][el.key][`quantity${el.key}`] = '0'
      formValues['rows'][el.key][`unit${el.key}`] = 'kpl'
      formValues['rows'][el.key][`quantity_price${el.key}`] = '0'
      formValues['rows'][el.key][`vat_percent${el.key}`] = 24
    }

    const quantity = formValues['rows'][el.key][`quantity${el.key}`] || '0'
    const formQuantity = parseFloat(quantity.replace(/,/g, '.'))

    const quantityPrice = formValues['rows'][el.key][`quantity_price${el.key}`] || '0'
    const formQuantityPrice = parseFloat(quantityPrice.replace(/,/g , '.'))

    const sum = formQuantity * formQuantityPrice
    const vat = formValues['rows'][el.key][`vat_percent${el.key}`] / 100

    formValues['rows'][el.key][`sum_tax_free${el.key}`] = new Intl.NumberFormat('fi-FI', {
      style: 'currency',
      currency: 'EUR'
    }).format(sum)

    formValues['rows'][el.key][`vat${el.key}`] = new Intl.NumberFormat('fi-FI', {
      style: 'currency',
      currency: 'EUR'
    }).format(sum * vat)

    formValues['rows'][el.key][`sum_with_vat${el.key}`] = new Intl.NumberFormat('fi-FI', {
      style: 'currency',
      currency: 'EUR'
    }).format(sum * (vat + 1))

    formValues['rows'][el.key][`vat_percent_description${el.key}`] = `${formValues['rows'][el.key][`vat_percent${el.key}`]} %`
    //TODO figure out if vat is wanted to be shown or not
    totalSum += sum * (vat + 1)

  })

  formValues['total_sum'] = totalSum

  return {
    user: state.oidc.user,
    invoiceInputRows: invoiceInputRows,
    invoiceRows: state.invoice.invoiceRows,
    customers: state.invoice.customers,
    countryItems,
    invoiceItems,
    overdueItems,
    unitItems,
    alvItems,
    alvPercentageItems,
    titleItems,
    invoicePages: Math.ceil(state.invoice.invoices.length / 10)
  }
}

const dueDate = (overdue, billingDate) => {
  let date = new Date(billingDate.valueOf())
  return new DateTimeFormat('fi', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }).format(date.setDate(billingDate.getDate() + overdue))
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getInvoicesStart: () => dispatch(getInvoicesStart()),
    addInvoiceRow: () => dispatch(addInvoiceRow()),
    removeInvoiceRow: () => dispatch(removeInvoiceRow()),
    onInvoiceReview: () => dispatch(onInvoiceReview()),
    invoicePageChange: selected => dispatch(invoicePageChange(selected)),
    changeInvoiceBillingDate: date => dispatch(changeInvoiceBillingDate(date)),
    selectInvoiceCustomer: customer => Object.keys(customer).forEach(key => dispatch(change('invoice', key, customer[key])))
  }
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign({}, stateProps, dispatchProps, ownProps)

NewInvoiceContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(NewInvoiceContainer)

export default NewInvoiceContainer

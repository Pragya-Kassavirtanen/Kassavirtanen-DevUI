import React from 'react'
import {
  CALCULATE_INVOICE_SUM,
  ADD_INVOICE_ROW,
  REMOVE_INVOICE_ROW,
  GET_INVOICES_SUCCESS,
  MIN_DATE_CHANGE,
  MAX_DATE_CHANGE,
  QUANTITY_CHANGE,
  QUANTITY_PRICE_CHANGE,
  ON_INVOICE_REVIEW,
  REMOVE_INVOICE,
  COPY_INVOICE_SUCCESS,
  INVOICE_PAGE_CHANGE,
  EMPTY_INVOICE_ROWS,
  CHANGE_INVOICE_BILLING_DATE
} from '../constants'
import { SESSION_TERMINATED, USER_EXPIRED } from 'redux-oidc'
import { getFormValues } from 'redux-form'


import store from '../store'
import DateTimeFormat from '../utils/DateTimeFormat'
import InvoiceInputRow from '../components/invoice/invoiceInputRow.component'
import InvoiceRow from '../components/invoice/invoiceRow.component'
const initialState  = {
  invoiceInputRows: [
    <InvoiceInputRow  key={0}
                      description={`rows[${0}][description${0}]`}
                      startDate={`rows[${0}][start_date${0}]`}
                      endDate={`rows[${0}][end_date${0}]`}
                      quantity={`rows[${0}][quantity${0}]`}
                      unit={`rows[${0}][unit${0}]`}
                      quantityPrice={`rows[${0}][quantity_price${0}]`}
                      vatPercent={`rows[${0}][vat_percent${0}]`}
                      vatPercentDescription={`rows[${0}][vat_percent_description${0}]`}
                      sumTaxFree={`rows[${0}][sum_tax_free${0}]`}
                      vat={`rows[${0}][vat${0}]`}
                      sumWithVAT={`rows[${0}][sum_with_vat${0}]`}
                      selectedStartDate={new Date('1900-01-01')}
                      selectedEndDate={new Date('3000-01-01')}/>
  ],
  customers: [],
  invoiceRowCounter: 1,
  rowKeys: [],
  invoiceRows: [],
  apiInvoices: [],
  invoices: [],
  selected: 0
}

const invoiceReducer = (state = initialState, action) => {

  switch (action.type) {

    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return Object.assign({}, {...state}, {invoiceRows: []})

    case GET_INVOICES_SUCCESS:
      return Object.assign({}, {...state}, {
        invoiceRows: _createInvoiceRow(action.invoices, state.selected),
        invoices: action.invoices,
        customers: action.customerResult.data
      })

    case CALCULATE_INVOICE_SUM:
      return Object.assign( {}, state, {
        rowKeys: state.rowKeys.concat(action.key)
      })

    case ADD_INVOICE_ROW:
      const copy = action.copy
      const rowState = state.invoiceInputRows

      return Object.assign( {}, state, {
        invoiceInputRows: rowState.concat(_createInputRow(state.invoiceRowCounter, copy)),
        invoiceRowCounter: state.invoiceRowCounter + 1
      })

    case REMOVE_INVOICE_ROW:
      return Object.assign( {}, state,  {
        invoiceInputRows: state.invoiceInputRows.filter((el, index) => index !== action.rowNumber)
      })

    case REMOVE_INVOICE:
      return Object.assign( {}, state,  {
        invoices: state.invoices.filter((el) => el.id !== action.id),
        invoiceRows: _createInvoiceRow(state.invoices.filter((el) => el.id !== action.id), state.selected)
      })

    case COPY_INVOICE_SUCCESS:
      return Object.assign( {}, state,  {billing_date: new Date(action.result.data.billing_date)})

    case EMPTY_INVOICE_ROWS:
      return Object.assign( {}, state,  {invoiceInputRows: [], invoiceRowCounter: 0})

    case MIN_DATE_CHANGE:

      const updatedInvoiceMinDateRows = state.invoiceInputRows.map((el) => {
        if (parseInt(el.key) === parseInt(action.rowNumber)) {
          const startDate = action.value ? new Date(action.value) : new Date('1900-01-01')
          const updatedProps = Object.assign({}, el.props, {
            selectedStartDate: new Date(startDate)
          })
          el = Object.assign({}, el, { props: { ...updatedProps } })
        }
        return el
      })

      return Object.assign({}, state, {
        invoiceInputRows: updatedInvoiceMinDateRows
      })

    case MAX_DATE_CHANGE:

      const updatedInvoiceMaxDateRows = state.invoiceInputRows.map((el) => {
        if (parseInt(el.key) === parseInt(action.rowNumber)) {
          const endDate = action.value ? new Date(action.value) : new Date('3000-01-01')
          const updatedProps = Object.assign({}, el.props, {
            selectedEndDate: new Date(endDate)
          })
          el = Object.assign({}, el, { props: { ...updatedProps } })
        }
        return el
      })

      return Object.assign({}, state, {
        invoiceInputRows: updatedInvoiceMaxDateRows
      })

    case QUANTITY_CHANGE:
      _calculateRowSum(action.rowNumber)
      return state

    case QUANTITY_PRICE_CHANGE:
      _calculateRowSum(action.rowNumber)
      return state

    case ON_INVOICE_REVIEW:
      _updateTotalSum()
      return state

    case INVOICE_PAGE_CHANGE:
      return Object.assign({}, {...state}, {invoiceRows: _createInvoiceRow(state.invoices,
        action.selected.selected),
        selected: action.selected.selected})

    case CHANGE_INVOICE_BILLING_DATE:
      return Object.assign( {}, state, {billing_date: action.date})

    default:
      return state
  }
}

const _updateTotalSum = () => {

  const formValues = getFormValues('invoice')(store.getState())

  let totalSum = 0
  formValues.rows.forEach(el => {

    if (!formValues['rows'][el.key]) {
      formValues['rows'][el.key] = {}
    }

    totalSum += parseFloat(formValues['rows']['sum_with_vat'].replace(/,/g, '.'))
    console.log(totalSum)
  })

  formValues['total_sum'] = totalSum
}

const _calculateRowSum = rowNumber => {

  const formValues = getFormValues('invoice')(store.getState())

  const quantity = formValues['rows'][rowNumber]['quantity'] || '0'
  const formQuantity = parseFloat(quantity.replace(/,/g, '.'))

  const quantityPrice = formValues['rows'][rowNumber]['quantity_price'] || '0'
  const formQuantityPrice = parseFloat(quantityPrice.replace(/,/g , '.'))

  const sum = formQuantity * formQuantityPrice
  const vat = formValues['rows'][rowNumber]['vat_percent'] / 100

  formValues['rows'][rowNumber]['sum_tax_free'] = new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR'
  }).format(sum)

  formValues['rows'][rowNumber]['vat'] = new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR'
  }).format(sum * vat)

  formValues['rows'][rowNumber]['sum_with_vat'] = new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR'
  }).format(sum * (vat + 1))

  formValues['rows'][rowNumber]['vat_percent_description'] = `${formValues['rows'][rowNumber]['vat_percent']} %`
}

const _createInvoiceRow = (invoices, selected) => invoices.slice((selected*10), (selected*10) + 10).map(el => <InvoiceRow key={el.id}
                                                                       billing_date={new DateTimeFormat('fi', {
                                                                         day: 'numeric',
                                                                         month: 'numeric',
                                                                         year: 'numeric'
                                                                       }).format(new Date(el.billing_date))}

                                                                       due_date={new DateTimeFormat('fi', {
                                                                         day: 'numeric',
                                                                         month: 'numeric',
                                                                         year: 'numeric'
                                                                       }).format(new Date(el.due_date))}

                                                                       customer={el.company_name}

                                                                       invoice_id={el.id}

                                                                       totalSumWithVAT={new Intl.NumberFormat('fi-FI', {
                                                                         style: 'currency',
                                                                         currency: 'EUR'
                                                                       }).format(el.total_sum)}

                                                                       instant_payment={el.instant_payment}

                                                                       state={el.state}
                                                                       
                                                                       functions=""/>)

const _createInputRow = (index, copy) => [
  <InvoiceInputRow  key={index}
       copy={copy}
       autoFocusIndex={`${index}`}
       description={`rows[${index}][description${index}]`}
       startDate={`rows[${index}][start_date${index}]`}
       endDate={`rows[${index}][end_date${index}]`}
       quantity={`rows[${index}][quantity${index}]`}
       unit={`rows[${index}][unit${index}]`}
       quantityPrice={`rows[${index}][quantity_price${index}]`}
       vatPercent={`rows[${index}][vat_percent${index}]`}
       vatPercentDescription={`rows[${index}][vat_percent_description${index}]`}
       sumTaxFree={`rows[${index}][sum_tax_free${index}]`}
       vat={`rows[${index}][vat${index}]`}
       sumWithVAT={`rows[${index}][sum_with_vat${index}]`}
       selectedStartDate={new Date('1900-01-01')}
       selectedEndDate={new Date('3000-01-01')}/>
]

export default invoiceReducer

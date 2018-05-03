import React from 'react'
import CustomerRow from '../components/customer/customerRow.component'
import {
  GET_CUSTOMERS_SUCCESS,
  CUSTOMER_PAGE_CHANGE,
  REMOVE_CUSTOMER,
  GET_CUSTOMER_BY_ID_SUCCESS,
  SAVE_CUSTOMER_UPDATE,
  CANCEL_CUSTOMER_UPDATE
} from '../constants'

const customerReducer = (
  state = {
    customerRows: [],
    customers: [],
    selected: 0,
    customerEdit: [],
    isEdit: false
  },
  action
) => {
  switch (action.type) {
    case GET_CUSTOMERS_SUCCESS:
      return Object.assign(
        {},
        { ...state },
        {
          customers: JSON.parse(action.result),
          customerRows: _createCustomerRow(
            JSON.parse(action.result),
            state.selected
          )
        }
      )


      case GET_CUSTOMER_BY_ID_SUCCESS:
      console.log('result:: ', action.result)
      return Object.assign(
        {},
        { ...state },
        {
          customerEdit: action.result,
          isEdit: true                                    
        }
      )


    case CUSTOMER_PAGE_CHANGE:
      return Object.assign(
        {},
        { ...state },
        {
          customerRows: _createCustomerRow(
            state.customers,
            action.selected.selected
          ),
          selected: action.selected.selected
        }
      )


    // API Success only use reducer
    case REMOVE_CUSTOMER:
      return Object.assign(
        {},
        { ...state },
        {
          customers: state.customers.filter(el => el.customer_id !== action.id),
          customerRows: _createCustomerRow(
            state.customers.filter(el => el.customer_id !== action.id),
            state.selected
          )
        }
      )

    case SAVE_CUSTOMER_UPDATE:
      return Object.assign(
        {},
        { ...state },
        {
          customerEdit: [],
          isEdit: false
        }
      )
   
    case CANCEL_CUSTOMER_UPDATE:
      return Object.assign(
        {},
        { ...state },
        {
          customerEdit: [],
          isEdit: false
        }
      )

    default:
      return state
  }
}

const _createCustomerRow = (customers, selected) =>
  customers
    .slice(selected * 10, selected * 10 + 10)
    .map(el => (
      <CustomerRow
        key={el.customer_id}
        companyName={el.company_name}
        contactPersonName={el.person_to_contact}
        contactPersonEmail={el.person_to_contact_email}
        address={el.delivery_address}
        zipCode={el.zip_code}
        city={el.city}
        customer_id={el.customer_id}
        functions=""
      />
    ))

export default customerReducer
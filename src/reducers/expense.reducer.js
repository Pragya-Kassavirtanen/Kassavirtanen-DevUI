import React from 'react'

import ExpenseInputRow from '../components/expenses/newExpenseInputRow.component'
import ExpenseRow from '../components/expenses/expenseRow.component'
import AllowanceRow from '../components/expenses/allowanceRow.component'
import AllowanceInputRow from '../components/expenses/newAllowanceInputRow.component'
import PassengerInputRow from '../components/expenses/newPassengerInputRow.component'

import {getFormValues} from 'redux-form'
import store from '../store'


import DateTimeFormat from '../utils/DateTimeFormat'

import {
  ADD_EXPENSE_ROW,
  REMOVE_EXPENSE_ROW,
  ADD_ALLOWANCE_ROW,
  REMOVE_ALLOWANCE_ROW,
  ADD_PASSENGER_ROW,
  REMOVE_PASSENGER_ROW,
  SHOW_ADDITIONAL_VEHICLE_INFO,
  CHANGE_ALLOWANCE_DATE,
  GET_EXPENSE_SUCCESS,
  EMPTY_EXPENSE_ROWS,
  SAVE_EXPENSE,
  SAVE_EXPENSE_SUCCESS,
  CLOSE_EXPENSE_SNACKBAR,
  EXPENSE_CHANGE_PAGE,
  LOAD_ALLOWANCE_COST_SUCCESS,
  ALLOWANCE_CHANGE_PAGE,
  SAVE_TRAVELLING_EXPENSE,
  SAVE_TRAVELLING_EXPENSE_SUCCESS
} from '../constants/index'
const initialState = {
  expenseInputRow: [
    <ExpenseInputRow key={0}
                     description={`expenseInputRow[${0}][description${0}]`}
                     sum={`expenseInputRow[${0}][sum${0}]`}
                     vat={`expenseInputRow[${0}][vat${0}]`}/>
  ],
  allowanceInputRow: [
    <AllowanceInputRow key={0} route={`allowanceInputRow[${0}][route]`}/>,
    <AllowanceInputRow key={1} route={`allowanceInputRow[${1}][route]`}/>
  ],
  expenses: [],
  expenseRow: [],
  expenseRowCounter: 1,
  allowanceRowCounter: 2,
  passengerRowCounter: 1,
  allowances: [],
  allowanceRow: [],
  allowancePassenger: [],
  rowKeys: [],
  showAdditionalInfo: false,
  days: 0,
  passengerPrice: 0,
  selected: 0,
  allowanceSelected: 0,
  showSpinner: false,
  showSnackbar: false
}

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_EXPENSE_SUCCESS:
      return Object.assign({}, {...state}, {
        expenseRow: _createExpenseRow(action.expenses, state.selected),
        expenses: action.expenses,
        allowanceRow: _createAllowanceRow(action.allowances, state.allowanceSelected, state.allowanceCost),
        allowances: action.allowances
      })

    case ADD_EXPENSE_ROW:
      const expenseRowState = state.expenseInputRow
      return Object.assign({}, state, {
        expenseInputRow: expenseRowState.concat(_createExpenseInputRow(state.expenseRowCounter)),
        expenseRowCounter: state.expenseRowCounter + 1
      })

    case SAVE_EXPENSE:
      return Object.assign({}, state, {showSpinner: true})

    case SAVE_EXPENSE_SUCCESS:
      return Object.assign({}, state, {showSpinner: false, showSnackbar: true})

    case CLOSE_EXPENSE_SNACKBAR:
      return Object.assign({}, state, {showSnackbar: false})

    case EMPTY_EXPENSE_ROWS:
      return Object.assign({}, state, {
        expenseInputRow: [
          <ExpenseInputRow key={0}
                           description={`expenseInputRow[${0}][description${0}]`}
                           sum={`expenseInputRow[${0}][sum${0}]`}
                           vat={`expenseInputRow[${0}][vat${0}]`}/>
        ],
        expenseRowCounter: 1
      })

    case REMOVE_EXPENSE_ROW:
      return Object.assign({}, state, {
        expenseInputRow: state.expenseInputRow.filter((el, index) => index !== action.key)
      })

    case ADD_ALLOWANCE_ROW:
      const allowanceRowState = state.allowanceInputRow
      return Object.assign({}, state, {
        allowanceInputRow: allowanceRowState.concat(_createAllowanceInputRow(state.allowanceRowCounter)),
        allowanceRowCounter: state.allowanceRowCounter + 1
      })

    case REMOVE_ALLOWANCE_ROW:
      return (state.allowanceInputRow.length > 2) ? Object.assign({}, state, {
          allowanceInputRow: state.allowanceInputRow.filter((el, index) => index !== action.key)
        }) : state

    case ADD_PASSENGER_ROW:
      const allowancePassengerState = state.allowancePassenger
      return Object.assign({}, state, {
        allowancePassenger: allowancePassengerState.concat(_createPassengerRow(state.passengerRowCounter)),
        passengerRowCounter: state.passengerRowCounter + 1,
        passengerPrice: state.passengerPrice + (store.getState()).expense.allowanceCost.passenger_cost.value
      })

    case REMOVE_PASSENGER_ROW:
      return Object.assign({}, state, {
        allowancePassenger: state.allowancePassenger.filter((el, index) => index !== action.key),
        passengerPrice: state.passengerPrice - (store.getState()).expense.allowanceCost.passenger_cost.value
      })

    case SHOW_ADDITIONAL_VEHICLE_INFO:
      return Object.assign({}, state, {showAdditionalInfo: action.value === 'o'})

    case CHANGE_ALLOWANCE_DATE:
      try {
        const start_date = getFormValues('newallowance')(store.getState()).start_date
        const end_date = getFormValues('newallowance')(store.getState()).end_date
        const difference = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24))
        if (!!difference) return Object.assign({}, state, {days: difference}); else return Object.assign({}, state, {days: 0})
      } catch (e) {
        return Object.assign({}, state, {days: 0})
      }

    case EXPENSE_CHANGE_PAGE:
      return Object.assign({}, {...state}, {
        expenseRow: _createExpenseRow(state.expenses, action.selected.selected),
        selected: action.selected.selected
      })

    case LOAD_ALLOWANCE_COST_SUCCESS:
      const allowanceCost = action.result.reduce((allCost, el) => {
        allCost[el.type] = {id: el.id, value: el.value, year: el.year}
        return allCost
      }, {})
      return Object.assign({}, state, {allowanceCost: {...allowanceCost, select: {id: 'select', value: 0}}})

    case ALLOWANCE_CHANGE_PAGE:
      return Object.assign({}, {...state}, {
        allowanceRow: _createAllowanceRow(state.allowances, action.selected.selected, state.allowanceCost),
        allowanceSelected: action.selected.selected
      })

    case SAVE_TRAVELLING_EXPENSE:
      return Object.assign({}, state, {showSpinner: true})

    case SAVE_TRAVELLING_EXPENSE_SUCCESS:
      return Object.assign({}, state, {showSpinner: false, showSnackbar: true})


    default:
      return state
  }
}

const _createExpenseRow = (expenses, selected) => expenses.slice((selected * 10), (selected * 10) + 10).map((el, index) =>
  <ExpenseRow key={index}
              company_name={el.company_name}
              date_of_purchase={new DateTimeFormat('fi', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
              }).format(new Date(el.date_of_purchase))}
              place_of_purchase={el.place_of_purchase}
              sum={new Intl.NumberFormat('fi-FI', {
                style: 'currency',
                currency: 'EUR'
              }).format(el.sum)}/>)


const _createAllowanceRow = (allowances, selected, cost) => allowances.slice((selected * 10), (selected * 10) + 10).map((el, index) =>
  <AllowanceRow key={index}
              company_name={el.company_name}
              start_date={new DateTimeFormat('fi', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
              }).format(new Date(el.start_date))}
              end_date={new DateTimeFormat('fi', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
              }).format(new Date(el.end_date))}
              sum={new Intl.NumberFormat('fi-FI', {
                style: 'currency',
                currency: 'EUR'
              }).format(_calculateAllowanceSum(el, cost))}/>)

const _createExpenseInputRow = (index) => [<ExpenseInputRow key={index}
                                                            autoFocusIndex={`${index}`}
                                                            description={`expenseInputRow[${index}][description${index}]`}
                                                            sum={`expenseInputRow[${index}][sum${index}]`}
                                                            vat={`expenseInputRow[${index}][vat${index}]`}/>]

const _createAllowanceInputRow = (index) => [<AllowanceInputRow key={index}
                                                                route={`allowanceInputRow[${index}][route]`}/>]

const _createPassengerRow = (index) => [<PassengerInputRow key={index}
                                                           passenger={`allowancePassenger[${index}][passenger]`}/>]

const _calculateAllowanceSum = (allowance, allowance_cost) =>
  allowance.distance *
    (allowance.vehicle_type +
    allowance.pay_working_dog * allowance_cost.working_dog.value +
    allowance.pay_forest_road * allowance_cost.forest_road.value +
    allowance.pay_heavy_load * allowance_cost.heavy_load.value +
    allowance.passenger_count * allowance_cost.passenger_cost.value +
    allowance.additional_vehicle_cost
    ) +
    allowance.full_time_allowance * allowance_cost.full_time_allowance.value +
    allowance.part_time_allowance * allowance_cost.part_time_allowance.value +
    allowance.meal_allowance * allowance_cost.meal_allowance.value

export default expenseReducer

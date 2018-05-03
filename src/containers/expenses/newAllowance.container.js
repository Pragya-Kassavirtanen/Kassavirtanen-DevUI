import React from 'react'

import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'

import { MenuItem } from 'material-ui'

import NewAllowanceComponent from '../../components/expenses/newAllowance.component'
import DateTimeFormat from '../../utils/DateTimeFormat'
import {
  addAllowanceRow,
  addPassengerRow,
  showAdditionalVehicleInfo,
  changeAllowanceDate,
  saveTravellingExpense,
  closeExpenseSnackBar
} from '../../actions/index'

import {
  countryItems,
  vehicleTypeItems,
  vehicleAdditionalItems
} from '../../utils/invoice.utils'

import { allowanceValidate as validate } from '../validate'

const date = new Date()
let newAllowanceContainer = reduxForm({
    form: 'newallowance',
    initialValues: {
      invoice: '',
      destination: '',
      country: 'Suomi',
      vehicle_type: 'default_vehicle_type',
      additional_vehicle_cost: 'default_additional_vehicle_cost',
      start_date: new DateTimeFormat('fi', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }).format(date),
      end_date: new DateTimeFormat('fi', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }).format(new Date(date.setFullYear(date.getFullYear() + 1))),
      allowanceInputRow: [{
        route: '',
        key: '0'
      },{
        route: '',
        key: '1'
        }
      ],
      distance: 0,
      pay_forest_road: false,
      pay_heavy_load: false,
      pay_working_dog: false,
      license_plate: '',
      pay_mileage: false,
      pay_allowance: false,
      full_time_allowance: 0,
      part_time_allowance: 0,
      meal_allowance: 0
    },
    validate
  }
)(NewAllowanceComponent)

const mapStateToProps = (state) => {
  const invoiceNames = state.invoice.invoices.map((item, index) =>
    <MenuItem key={index} value={item} primaryText={item.company_name + ' ' + new DateTimeFormat('fi', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }).format(new Date(item.due_date)) + ' ' + item.total_sum + '€'}/>)

  const allowanceInputRows = state.expense.allowanceInputRow
  const formValues = getFormValues('newallowance')(state)

  //remove removed lines from form
  if (formValues) {
    formValues['allowanceInputRow'] =
      formValues['allowanceInputRow'].filter(x => allowanceInputRows.filter(y => y.key === x.key).length > 0)

    allowanceInputRows.forEach(el => {
      !formValues['allowanceInputRow'][el.key] &&
      (formValues['allowanceInputRow'][el.key] = {route: '', key: el.key})
    })
  } else {
    state.expense.allowanceInputRow = state.expense.allowanceInputRow.slice(0, 2)
    state.expense.allowancePassenger = []
  }

  return {
    user: state.oidc.user,
    invoices: invoiceNames,
    allowanceCost: state.expense.allowanceCost,
    allowanceRows: allowanceInputRows,
    allowancePassenger: state.expense.allowancePassenger,
    showAdditionalInfo: state.expense.showAdditionalInfo,

    showMileageForm: !formValues || formValues.pay_mileage,
    showAllowanceForm: !formValues || formValues.pay_allowance,
    startDate: !formValues || formValues.start_date,
    endDate: !formValues || formValues.end_date,

    showSpinner: state.expense.showSpinner,
    showSnackbar: state.expense.showSnackbar,

    countryItems,
    vehicleTypeItems,
    vehicleAdditionalItems,

    fullTimeSelected: !!formValues && formValues.pay_allowance && formValues.full_time_allowance,
    partTimeSelected: !!formValues && formValues.pay_allowance && formValues.part_time_allowance,
    mealSelected: !!formValues && formValues.pay_allowance && formValues.meal_allowance,

    allowanceDaysFull: _createMenuItems(_getFullDayValues(state.expense.days, formValues)),
    allowanceDaysPart: _createMenuItems(_getPartDayValues(state.expense.days, formValues)),
    allowanceDaysMeal: _createMenuItems(_getMealValues(state.expense.days, formValues)),

    distance: !!formValues && formValues.pay_mileage
      ? (!isNaN(Number.parseFloat(formValues.distance)) ? parseFloat(formValues.distance) : false)  : false,
    kmPrice: calculateKmPrice(state, formValues)
}}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addAllowanceRow: () => dispatch(addAllowanceRow()),
    addPassengerRow: () => dispatch(addPassengerRow()),
    showAdditionalVehicleInfo: value => dispatch(showAdditionalVehicleInfo(value)),
    changeAllowanceDate: () => dispatch(changeAllowanceDate()),
    saveTravellingExpense: () => dispatch(saveTravellingExpense()),
    closeSnackbar: () => dispatch(closeExpenseSnackBar())
  }
}

const _createMenuItems = (rows) => Array(!!rows?rows+1:1).fill().map((_, index) => <MenuItem key={index} value={index} primaryText={JSON.stringify(index)}/>)

const _getPartDayValues = (days, formValues) =>
  !!formValues ?
    Math.max((days - (formValues.full_time_allowance || 0) - (Math.floor(formValues.meal_allowance / 2) || 0)), 0) : 1

const _getFullDayValues = (days, formValues) =>
  !!formValues ?
    Math.max((days - (formValues.part_time_allowance || 0) - (Math.floor(formValues.meal_allowance / 2) || 0)), 0) : 1

const _getMealValues = (days, formValues) =>
  !!formValues ?
    Math.max((2*(days - (formValues.part_time_allowance || 0) - (formValues.full_time_allowance || 0))), 0) : 2

const calculateKmPrice = (state, formValues) => {

  let kmPrice = 0
  const allowanceCost = state.expense.allowanceCost

  if (!!formValues && formValues.pay_mileage && !!formValues.vehicle_type) {
    kmPrice = allowanceCost[formValues.vehicle_type]['value'] + state.expense.passengerPrice

    if (formValues.vehicle_type === 'own_car') {
      if (!!formValues.additional_vehicle_cost) { kmPrice += allowanceCost[formValues.additional_vehicle_cost]['value'] }
      if (formValues.pay_forest_road) { kmPrice += allowanceCost.forest_road.value }
      if (formValues.pay_heavy_load)  { kmPrice += allowanceCost.heavy_load.value }
      if (formValues.pay_working_dog) { kmPrice += allowanceCost.working_dog.value }
    }
  }
  return kmPrice
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign({}, stateProps, dispatchProps, ownProps)

newAllowanceContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(newAllowanceContainer)

export default newAllowanceContainer

import { takeEvery, put, take, call } from 'redux-saga/effects'


import {
  saveExpenseFailure,
  saveExpenseSuccess,
  getExpenseSuccess,
  getExpenseFailed,
  emptyExpenseRows,
  loadAllowanceCostSuccess,
  saveTravellingExpenseSuccess} from '../actions/index'
import { SAVE_EXPENSE, API_SERVER, GET_EXPENSE_START, SAVE_TRAVELLING_EXPENSE, LOAD_ALLOWANCE_COST } from '../constants/index'
import { apiRequest, apiPost, createUploadFileChannel } from '../utils/request'
import store from '../store'
import { getFormValues, reset } from 'redux-form'
import { formatFiDateToISO } from '../utils/DateTimeFormat'

/**
 * @author Skylar Kong
 */

function* getExpenseStartSaga() {
  try {

    const uuid = (store.getState()).profile.uuid

    if(!!uuid) {
      const expenseUrl = `${API_SERVER}/users/${uuid}/expenses`
      const expenseResult = yield apiRequest(expenseUrl)
      const expenses = []

      expenseResult[Symbol.iterator] = function*() {
        const keys = Reflect.ownKeys(this)
        for (const key of keys) {
          yield this[key]
        }
      }

      for (const expense of expenseResult.data) {
        expenses.push(expense)
      }

      const allowanceUrl = `${API_SERVER}/users/${uuid}/allowances`
      const allowanceResult = yield apiRequest(allowanceUrl)

      const allowances = []

      allowanceResult[Symbol.iterator] = function* () {
        const keys = Reflect.ownKeys(this)
        for (const key of keys) {
          yield this[key]
        }
      }

      for (const allowance of allowanceResult.data) {
        allowances.push(allowance)
      }

      yield put(getExpenseSuccess(expenses, allowances))
    }

  } catch (e) {
    yield put(getExpenseFailed(e))
  }
}

function* saveExpenseSaga() {

  const url = `${API_SERVER}/expense-invoices`

  const user_uuid = (store.getState()).profile.uuid
  const formValues = getFormValues('newfee')(store.getState())

  formValues.date_of_purchase = formatFiDateToISO(formValues.date_of_purchase)
  const file = formValues.inputFile[0]
  const rows = formValues.expenseInputRow

  rows[Symbol.iterator] = function* () {
    const keys = Reflect.ownKeys(this)
    for (const key of keys) {
      yield this[key]
    }
  }

  const body = {
    user_info_uuid: user_uuid,
    date_of_purchase: formValues.date_of_purchase,
    place_of_purchase: formValues.place_of_purchase,
    invoice_id: formValues.invoice.id
  }

  body.rows = rows.map((el, ind) => {
    el.vat = el['vat' + ind] / 100
    el.description = el['description' + ind]
    el.sum = el['sum' + ind]

    delete el['vat' + ind]
    delete el['description' + ind]
    delete el['sum' + ind]
    return el
  })

  try {
    const channel = yield call(createUploadFileChannel, url, file, body)
    while (true) {
      const {progress = 0, err, success} = yield take(channel)
      if (err) {
        yield put(saveExpenseFailure(err))
      }
      if (success) {
        yield put(saveExpenseSuccess(success))
        yield put(emptyExpenseRows())
        yield put(reset('newfee'))
      }
      console.log(progress)
    }
  } catch (e) {
    console.log(e)
  }
}

function* saveTravellingExpense() {

  const url = `${API_SERVER}/allowances`

  const formValues = getFormValues('newallowance')(store.getState())

  const allowanceCost = (store.getState()).expense.allowanceCost
  const refinedForm = Object.assign({}, {...formValues}, {
    routes:                     formValues.allowanceInputRow.filter(el => el),
    start_date:                 formatFiDateToISO(formValues.start_date),
    end_date:                   formatFiDateToISO(formValues.end_date),
    invoice_id:                 formValues.invoice.id,
    vehicle_type_id:            !!formValues.vehicle_type ? allowanceCost[formValues.vehicle_type]['id'] : '1',
    additional_vehicle_cost_id: !!formValues.additional_vehicle_cost ? allowanceCost[formValues.additional_vehicle_cost]['id'] : '2',
    passengers:                 !!formValues.allowancePassenger ? formValues.allowancePassenger.filter(el => el) : [],
    pay_mileage:                !!formValues.pay_mileage,
    pay_allowance:              !!formValues.pay_allowance
  })

  delete refinedForm.invoice
  delete refinedForm.allowanceInputRow
  delete refinedForm.allowancePassenger


  const result = yield call(apiPost, url, JSON.stringify({ ...refinedForm }))
  yield put(saveTravellingExpenseSuccess(result))
}

function* loadAllowanceCost() {

  const thisYear = (new Date()).getFullYear()
  const url = `${API_SERVER}/allowances/costs/${thisYear}`

  const result = yield call(apiRequest, url)
  yield put(loadAllowanceCostSuccess(result.data))
}

export function* watchSaveExpenseSaga() {
  yield takeEvery(SAVE_EXPENSE, saveExpenseSaga)
}

export function* watchGetExpenseStartSaga() {
  yield takeEvery(GET_EXPENSE_START, getExpenseStartSaga)
}

export function* watchSaveTravellingExpenseSaga() {
  yield takeEvery(SAVE_TRAVELLING_EXPENSE, saveTravellingExpense)
}

export function* watchLoadAllowanceCostSaga() {
  yield takeEvery(LOAD_ALLOWANCE_COST, loadAllowanceCost)
}


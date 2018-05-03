import { takeEvery, put, call } from 'redux-saga/effects'
import {
  API_SERVER,
  GET_NEW_SALARY_START,
  SELECT_ROW_SALARY,
  POST_SALARY
} from '../constants/index'
import { getNewSalarySuccess, selectRowSalarySuccess, getSalariesSuccess } from '../actions/index'
import store from '../store'
import { apiRequest, apiPost } from '../utils/request'


function* getNewSalarySaga() {
  try {
    const uuid = (store.getState()).profile.uuid
    if(!!uuid) {
      const url = `${API_SERVER}/salaries/${uuid}/invoices`

      const result = yield call(apiRequest, url)
      const invoices = []

      result[Symbol.iterator] = function*() {
        const keys = Reflect.ownKeys(this)
        for (const key of keys) {
          yield this[key]
        }
      }

      for (const invoice of result.data) {
        invoices.push(invoice)
      }

      yield put(getNewSalarySuccess(invoices))
    }
  } catch (e) {
    console.warn(e)
  }
}

function* postSalarySaga({ selected }) {
  try {
    const uuid = (store.getState()).profile.uuid
    if(!!uuid) {
      const body = JSON.stringify({
        user_info_uuid: uuid,
        invoices: selected
      })
      const url = `${API_SERVER}/salaries`

      console.log(body)
      console.log(url)
      yield call(apiPost, url, body)
    }
  } catch (e) {
    console.warn(e)
  }
}

function* getSalariesSaga() {
  try {
    const uuid = (store.getState()).profile.uuid
    if(!!uuid) {
      const url = `${API_SERVER}/users/${uuid}/salaries`
      const result = yield call(apiRequest, url)
      yield put(getSalariesSuccess(result))
    }
  } catch (e) {
      console.warn(e)
  }
}

function* selectRowSalarySaga() {
  try {
    const uuid = (store.getState()).profile.uuid
    if(!!uuid) {
      const selected = (store.getState()).salary.selectedRows.map(a => (store.getState()).salary.newSalary[a].id)
      const body = JSON.stringify({
        id_list: selected,
        user_info_uuid: uuid
      })

      const expensesUrl = `${API_SERVER}/expense-invoices/sum`
      const allowancesUrl = `${API_SERVER}/allowances/sum`

      let allowancesResult = yield call(apiPost, allowancesUrl, body)
      let expensesResult = yield call(apiPost, expensesUrl, body)

      console.log(allowancesResult, expensesResult)

      yield put(selectRowSalarySuccess({
        allowancesResult: allowancesResult,
        expensesResult: expensesResult
      }))
    }
  } catch (e) {
    console.warn(e)
  }
}


export function* watchGetNewSalarySaga() {
  yield takeEvery(GET_NEW_SALARY_START, getNewSalarySaga)
}

export function* watchSelectRowSalarySaga() {
  yield takeEvery(SELECT_ROW_SALARY, selectRowSalarySaga)
}

export function* watchPostSalarySaga() {
  yield takeEvery(POST_SALARY, postSalarySaga)
}

export function* watchGetSalariesSaga() {
  yield takeEvery(GET_NEW_SALARY_START, getSalariesSaga)
}

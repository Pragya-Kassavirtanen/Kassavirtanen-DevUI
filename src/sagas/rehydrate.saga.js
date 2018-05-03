 import { takeEvery, put } from 'redux-saga/effects'
import { REHYDRATE } from 'redux-persist/constants'
import {
  getCustomersStart,
  getInvoicesStart,
  loadProfileStart,
  getTaxCardStart,
  getNewSalaryStart
} from '../actions/index'

//TODO all cases when backend support

function* rehydrateSaga({ payload }) {
  try {
    const routing = payload.routing
    if(!!routing) {
      switch (routing.locationBeforeTransitions.pathname.split('/').slice(-1)[0]) {
        case 'customer':
          yield put(getCustomersStart())
          break
        case 'invoice':
          yield put(getInvoicesStart())
          break
        case 'salary':
          yield put(getNewSalaryStart())
          break
        case 'profile':
          yield put(loadProfileStart())
          yield put(getTaxCardStart())
          break
        case 'fee':
          break
        default:
          console.warn('default rehydrate')
      }
    }
  }
  catch (e) {

  }
}


export function* watchRehydrateSaga() {
  yield takeEvery(REHYDRATE, rehydrateSaga)
}

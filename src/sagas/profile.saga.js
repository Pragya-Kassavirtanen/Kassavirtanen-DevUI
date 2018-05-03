import { takeEvery, put, call } from 'redux-saga/effects'
import store from '../store'
import { change, getFormValues } from 'redux-form'

import {
  LOAD_PROFILE_START,
  //LOAD_PROFILE_SUCCESS,
  //LOAD_PROFILE_FAILED,
  ON_PROFILE_UPDATE,
  API_SERVER
} from '../constants'

import { apiRequest, apiPost } from '../utils/request'
import { loadProfileSuccess, loadProfileFailed } from '../actions'

function* loadProfileSaga() {

  try {
    const uuid = (store.getState()).profile.uuid
    if(!!uuid) {
      const url = `${API_SERVER}/users/${uuid}`
      const result = yield call(apiRequest, url)

      yield put(loadProfileSuccess(result.data))

      //yield is reserved word so forEach is not possible to use
      let keys = Object.keys(result.data)
      for (let key of keys) {
        yield put(change('profile', key, result.data[key]))
      }
    }
  } catch (e) {
    yield put(loadProfileFailed(e))
  }

}

function* updateProfileSaga() {
  try {
    const formValues = getFormValues('profile')(store.getState())
    const uuid = (store.getState()).profile.uuid
    const body = JSON.stringify({...formValues, uuid: uuid})

    const url = `${API_SERVER}/users`
    const result = yield call(apiPost, url, body, 'PUT')
    yield put(loadProfileSuccess(result.data))


  } catch (e) {
  console.warn(e)
}
}

export function* watchLoadProfileSaga() {
  yield takeEvery(LOAD_PROFILE_START, loadProfileSaga)
}

export function* watchUpdateProfileSaga() {
  yield takeEvery(ON_PROFILE_UPDATE, updateProfileSaga)
}

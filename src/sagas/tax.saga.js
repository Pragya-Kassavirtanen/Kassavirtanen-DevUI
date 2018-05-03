import { takeEvery, call, take, put } from 'redux-saga/effects'
import { POST_TAX_CARD, API_SERVER, GET_TAX_CARD_START, POST_YEL_START, GET_YEL_START } from '../constants'
import { createUploadFileChannel, apiRequest } from '../utils/request'
import { postTaxCardSuccess, getYelSuccess, getYelFailed } from '../actions/index'
import { change } from 'redux-form'

import store from '../store'

/**
 * @author Skylar Kong
 *
 */


function* postTaxCardSaga(action) {
  try {
    const url =`${API_SERVER}/documents`
    const file = action.e.target.files[0]
    const user_uuid = { user_info_uuid: (store.getState()).profile.uuid }

    const channel = yield call(createUploadFileChannel, url, file, user_uuid)
    while (true) {
      const {progress = 0, err, success} = yield take(channel)
      if (err) {
        yield put(postTaxCardSuccess())
      }
      if (success) {
        yield put(postTaxCardSuccess())
      }
      console.log(progress)
    }
  } catch(e) {
    console.warn(e)
  }
}

function* getTaxCardSaga() {
  try {
    const uuid = (store.getState()).profile.uuid
    if (!!uuid) {
      const url = `${API_SERVER}/users/${uuid}/documents`

      const result = yield apiRequest(url)
      yield put(change('tax', 'taxCard', result.data.slice(-1)[0].filename))
    }
  } catch(e) {
    console.warn('no tax card')
  }

}

function* postYelSaga() {
  try {

    //const uuid = (store.getState()).profile.uuid
    //const url =`${API_SERVER}/yel`
    //const formValues = getFormValues('yel')(store.getState())
    //const body = JSON.parse(JSON.stringify({
    //  ...formValues,
    //  user_info_uuid: uuid
    //}))
    // Commented until backend ready
    // const result = yield call(apiPost, url, JSON.stringify(body))
    // console.log(result)
  } catch(e) {
    console.warn(e)
  }
}

function* getYelSaga() {
  try {
    const year = (new Date().getFullYear())
    const url = `${API_SERVER}/yels/${year}`
    const result = yield apiRequest(url)
    yield put(getYelSuccess(result))
  } catch(e) {
    yield put(getYelFailed())
  }
}

export function* watchTaxSaga() {
  yield takeEvery(POST_TAX_CARD, postTaxCardSaga)
}

export function* watchGetTaxCardStartSaga() {
  yield takeEvery(GET_TAX_CARD_START, getTaxCardSaga)
}

export function* watchPostYelSaga() {
  yield takeEvery(POST_YEL_START, postYelSaga)
}

export function* watchGetYelSaga() {
  yield takeEvery(GET_YEL_START, getYelSaga)
}

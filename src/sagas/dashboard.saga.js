import { takeEvery, put, call } from 'redux-saga/effects'

import { checkAuthInfoSuccess, checkAuthInfoFailed } from '../actions'
import { CHECK_AUTH_INFO, API_SERVER } from '../constants'
import { apiPost } from '../utils/request'
import store from '../store'

/**
 * @author Skylar Kong
 */

function* checkAuthInfo() {

  try {

    const url = `${API_SERVER}/user-check`

    const profile = (store.getState()).oidc.user.profile

    const body = JSON.stringify({
      first_name: profile.given_name,
      last_name: profile.family_name,
      email: profile.email
    })

    const result = yield call(apiPost, url, body)
    yield put(checkAuthInfoSuccess(result.data))

  } catch (e) {
    yield put(checkAuthInfoFailed(e))
  }
}

export function* watchCheckAuthInfoSaga() {
  yield takeEvery(CHECK_AUTH_INFO, checkAuthInfo)
}

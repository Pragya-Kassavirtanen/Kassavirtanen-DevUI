import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import {
  LOGIN_FORM_SUBMIT, 
  CLIENT_UNSET,
  KVT_IDENTITY_SERVER
} from '../constants'
import { loginFormSubmitSuccess, loginFormSubmitFailed, setClient, unsetClient } from '../actions'
import { registerPost } from '../utils/request'
import { getFormValues } from 'redux-form'
import store from '../store'

/**
 * @author Pragya Gupta
 *
 */

function* loginFlow() {
  let user

  try {
    const url = `${KVT_IDENTITY_SERVER}/CheckUser`

    const formValues = getFormValues('login')(store.getState())

    const refinedForm = Object.assign({}, {...formValues})
    const body = JSON.stringify({    
      email: refinedForm.email,     
      password: refinedForm.password,     
      SubjectId: refinedForm.email
      })

    user = yield call(registerPost, url, body)

    yield put(setClient(user))

    yield put(loginFormSubmitSuccess(user))

    sessionStorage.setItem('user', JSON.stringify(user))

    browserHistory.push('/dashboard/main')
  } catch (error) {
    yield put(loginFormSubmitFailed(error))
  } finally {
    if (yield cancelled()) {
      browserHistory.push('/dashboard/login')
    }
    return user
  }
}

function* logout() {
  yield put(unsetClient())
  sessionStorage.removeItem('user')
  browserHistory.push('/dashboard/login')
}

export function* watchLoginSaga() {
  while (true) {
    yield take(LOGIN_FORM_SUBMIT)
    const task = yield fork(loginFlow)
    const action = yield take([CLIENT_UNSET, loginFormSubmitFailed])
    if (action.type === CLIENT_UNSET) yield cancel(task)
    yield call(logout)
  }
}
import { takeEvery, call, put } from 'redux-saga/effects'

import store from '../store'
import { getFormValues } from 'redux-form'

import { formatFiToISO } from '../utils/DateTimeFormat'

import {
  SEARCH_ADMIN_INVOICE,
  API_SERVER,
  EXPAND_ADMIN_INVOICE,
  SEARCH_ADMIN_USERS,
  CHANGE_ADMIN_MENU,
  UPDATE_ADMIN_INVOICE,
  EXPAND_ADMIN_USER,
  UPDATE_ADMIN_USER
} from '../constants'

import { convertStateToInt } from '../utils/invoice.utils'

import { apiPost, apiRequest } from '../utils/request'

import {
  searchAdminInvoiceSuccess,
  searchAdminInvoiceFailed,
  searchAdminInvoice,
  expandAdminInvoiceTrue,
  expandAdminInvoiceFalse,
  searchAdminUsersSuccess,
  updateAdminInvoiceResult,
  searchAdminUsersFailed,
  expandAdminUserFalse,
  expandAdminUserTrue,
  updateAdminUserResult
} from '../actions/index'

function* adminInvoiceSearchSaga() {
  try {

    const url = `${API_SERVER}/user-invoices`
    const body = JSON.stringify({ user_info_uuid: (store.getState()).profile.uuid })
    const result = yield call(apiPost, url, body)
    const invoices = []


    result[Symbol.iterator] = function* () {
      const keys = Reflect.ownKeys(this)
      for (const key of keys) {
        yield this[key]
      }
    }

    for (const invoice of result.data) {
      invoices.push(invoice)
    }

    yield put(searchAdminInvoiceSuccess(invoices))

  } catch (e) {
    yield put(searchAdminInvoiceFailed())
  }

}


//TODO: admin users route
function* adminUsersSearchSaga() {
  try {
    const url = `${API_SERVER}/admin/users`
    const result = yield call(apiRequest, url)
    console.log(result)
    yield put(searchAdminUsersSuccess(result))

  } catch (e) {
    yield put(searchAdminUsersFailed)
  }
}

function* adminUserExpandSaga( { expanded, uuid }) {
  try {
    if (!expanded){
      yield put(expandAdminUserFalse(uuid))
    } else {
      const invoiceUrl = `${API_SERVER}/users/${uuid}`
      const invoiceResult = yield call(apiRequest, invoiceUrl)
      yield put(expandAdminUserTrue(invoiceResult))
    }
  } catch (e) {
    console.warn(e)
  }
}

function* adminInvoiceExpandSaga( { expanded, id }) {
  try {
    if (!expanded){
      yield put(expandAdminInvoiceFalse(id))
    } else {
      const uuid = (store.getState()).profile.uuid
      const invoiceUrl = `${API_SERVER}/users/${uuid}/invoices/${id}`
      const invoiceResult = yield call(apiRequest, invoiceUrl)
      yield put(expandAdminInvoiceTrue(invoiceResult))
    }
  } catch (e) {
    console.warn(e)
  }
}

function* adminInvoiceUpdateSaga({ id }) {
  try {
    const uuid = (store.getState()).profile.uuid
    const formValues = getFormValues(`AdminInvoiceForm_${id}`)(store.getState())
    const invoiceUrl = `${API_SERVER}/invoices`
    const body = JSON.parse(JSON.stringify({
      id: id,
      user_info_uuid: uuid,
      description: formValues.description,
      business_id: formValues.business_id,
      job_title: formValues.job_title,
      invoice_reference: formValues.invoice_reference,
      billing_date: formatFiToISO((formValues.billing_date).split('.')),
      due_date: formatFiToISO((formValues.due_date).split('.')),
      overdue: formValues.overdue,
      person_to_contact: formValues.person_to_contact,
      person_to_contact_email: formValues.person_to_contact_email,
      finvoice_address: formValues.finvoice_address,
      finvoice_operator: formValues.finvoice_operator,
      delivery_address: formValues.delivery_address,
      zip_code: formValues.zip_code,
      city: formValues.city,
      country: formValues.country,
      total_sum: parseFloat(formValues.total_sum.replace(/,/g, '.').replace(/\s/g, '')).toString(),
      company_name: formValues.company_name,
      instant_payment: formValues.instant_payment,
      state: convertStateToInt(formValues.state),
      delivery_method: formValues.delivery_method
    }))
    yield call(apiPost, invoiceUrl, JSON.stringify(body), 'PUT')
    yield put(updateAdminInvoiceResult(true))
  } catch (e) {
    console.warn(e)
    yield put(updateAdminInvoiceResult(false))
  }
}

function* adminUserUpdateSaga({ uuid, email }) {
  try {
    const formValues = getFormValues(`AdminUserForm_${email.replace('.', '')}`)(store.getState())
    const invoiceUrl = `${API_SERVER}/admin/user-update`
    const body = JSON.parse(JSON.stringify({
      user_info_uuid: uuid,
      tax_percent: parseFloat(formValues.tax_percent),
      service_fee: parseFloat(formValues.service_fee)
    }))
    yield call(apiPost, invoiceUrl, JSON.stringify(body), 'PUT')
    yield put(updateAdminUserResult(true))
  } catch (e) {
    console.warn(e)
    yield put(updateAdminUserResult(false))
  }
}


function* adminChangeMenuSaga({ value, email }) {
  try {
    if (value === 0 && !!email) {
      yield put(searchAdminInvoice())
    }
  } catch (e) {
    console.warn(e)
  }
}

export function* watchAdminChangeMenuSaga() {
  yield takeEvery(CHANGE_ADMIN_MENU, adminChangeMenuSaga)
}

export function* watchAdminUsersSearchSaga() {
  yield takeEvery(SEARCH_ADMIN_USERS, adminUsersSearchSaga)
}

export function* watchAdminInvoiceSearchSaga() {
  yield takeEvery(SEARCH_ADMIN_INVOICE, adminInvoiceSearchSaga)
}

export function* watchAdminInvoiceExpandSaga() {
  yield takeEvery(EXPAND_ADMIN_INVOICE, adminInvoiceExpandSaga)
}

export function* watchAdminInvoiceUpdateSaga() {
  yield takeEvery(UPDATE_ADMIN_INVOICE, adminInvoiceUpdateSaga)
}

export function* watchAdminUserExpandSaga() {
  yield takeEvery(EXPAND_ADMIN_USER, adminUserExpandSaga)
}

export function* watchAdminUserUpdateSaga() {
  yield takeEvery(UPDATE_ADMIN_USER, adminUserUpdateSaga)
}

import { watchGetInvoiceSaga, watchSaveAndSendInvoiceSaga, watchCopyInvoice, watchRemoveInvoiceSaga, watchSaveInvoiceDraft } from './invoice.saga'
import { watchTaxSaga, watchGetTaxCardStartSaga, watchPostYelSaga, watchGetYelSaga } from './tax.saga'
import { watchCheckAuthInfoSaga } from './dashboard.saga'
import { watchLoadProfileSaga, watchUpdateProfileSaga } from './profile.saga'
import { watchNewCustomerSaga, watchGetCustomersSaga, watchGetCustomerByIdSaga, watchRemoveCustomerSaga, watchSaveCustomerSaga  } from './customer.saga'
import { watchSendRegisterInfoSaga } from './register.saga'
import {
  watchAdminInvoiceSearchSaga,
  watchAdminInvoiceExpandSaga,
  watchAdminUsersSearchSaga,
  watchAdminChangeMenuSaga,
  watchAdminInvoiceUpdateSaga,
  watchAdminUserExpandSaga,
  watchAdminUserUpdateSaga
} from './admin.saga'
import { watchRehydrateSaga } from './rehydrate.saga'
import { watchGetNewSalarySaga, watchSelectRowSalarySaga, watchGetSalariesSaga, watchPostSalarySaga } from './salary.saga'
import { watchSaveExpenseSaga, watchSaveTravellingExpenseSaga, watchGetExpenseStartSaga, watchLoadAllowanceCostSaga } from './expense.saga'
import { watchLoginSaga } from './login.saga'

// Single entry point to start all sagas at once
export default function* rootSaga() {
  yield  [
    watchGetInvoiceSaga(),
    watchSaveAndSendInvoiceSaga(),
    watchTaxSaga(),
    watchCheckAuthInfoSaga(),
    watchLoadProfileSaga(),
    watchCopyInvoice(),
    watchRemoveInvoiceSaga(),
    watchNewCustomerSaga(),
    watchGetCustomersSaga(),
    watchGetCustomerByIdSaga(),

    watchRemoveCustomerSaga(),
    watchSaveCustomerSaga(),


    watchSaveInvoiceDraft(),
    watchGetTaxCardStartSaga(),
    watchUpdateProfileSaga(),
    watchAdminInvoiceSearchSaga(),
    watchAdminInvoiceExpandSaga(),
    watchAdminUsersSearchSaga(),
    watchAdminChangeMenuSaga(),
    watchRehydrateSaga(),
    watchGetNewSalarySaga(),
    watchAdminInvoiceUpdateSaga(),
    watchAdminUserExpandSaga(),
    watchAdminUserUpdateSaga(),
    watchSaveExpenseSaga(),
    watchGetExpenseStartSaga(),
    watchPostYelSaga(),
    watchSaveTravellingExpenseSaga(),
    watchLoadAllowanceCostSaga(),
    watchGetYelSaga(),
    watchSelectRowSalarySaga(),
    watchGetSalariesSaga(),
    watchPostSalarySaga(),
    watchSendRegisterInfoSaga(),
    watchLoginSaga()
  ]
}

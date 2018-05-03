import { createStore, applyMiddleware, compose } from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import { asyncSessionStorage } from 'redux-persist/storages'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import createOidcMiddleware from 'redux-oidc'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import createLogger from 'redux-logger'
import userManager from './utils/PHZUserManager'
import rootSaga  from './sagas'

/**
 * TODO: Describe me
 *
 * @author Skylar Kong
 */

const logger = createLogger()

// create the middleware with the userManager
const oidcMiddleware = createOidcMiddleware(userManager)

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(
    logger,
    oidcMiddleware,
    routerMiddleware(browserHistory),
    sagaMiddleware
  ),
  autoRehydrate()
) (createStore)

const initialState = {
  form: {
    invoice: {
      values: {
        amount: 0,
        unitPrice: 0,
        dueDate: '30.03.2017',
        overdue: 14,
        rows: []
      }
    },
    invoiceReview: {
      values: {}
    },
    newallowance: {
      values: {
        allowanceInputRow: []
      }
    },
    newfee: {
      values: {
        expenseInputRow: []
      }
    },
    yel: {
      values: {
        income: 0
      }
    }
  }
}

const store = createStoreWithMiddleware(reducers, initialState)

sagaMiddleware.run(rootSaga)

const whitelist = ['profile', 'routing']
persistStore(store, {storage: asyncSessionStorage, whitelist: whitelist})

export default store

import React from 'react'
import 'core-js/fn/object/assign'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './routes'

// for older browsers
require('es6-promise').polyfill()

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class RootComponent extends React.Component {

  render () {
    return (
      <Provider store={store}>             
          <Routes/>   
      </Provider>
    )
  }
}
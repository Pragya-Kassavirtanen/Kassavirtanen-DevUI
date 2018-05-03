import { connect } from 'react-redux'

import DashboardComponent from '../components/dashboard/dashboard.component'
import { checkAuthInfo } from '../actions'
import store from '../store'

const mapStateToProps = state => {
  return {   
    user : state.oidc.user ? state.oidc.user : (store.getState()).client.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,

    checkAuthInfo: () => dispatch(checkAuthInfo()),

    onCreateInvoice: e => {
      e.preventDefault()
      console.log('container: invoice')
    },

    onCreateCustomer: e => {
      e.preventDefault()
      console.log('container: add customer')
    }
  }
}

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)

export default DashboardContainer

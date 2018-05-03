import { connect } from 'react-redux'
import MainComponent from '../components/main.component'
import store from '../store'
import { CLIENT_UNSET } from '../constants'

/**
 * An High order container class for the the main component.
 *
 * @author  Skylar Kong
 *
 */

// This method will be called every time
// when the store is updated
const mapStateToProps = (state, ownProps) => {
  return {   
    user : state.oidc.user ? state.oidc.user : (store.getState()).client.user,
    navItems: navItems,
    path: ownProps.location.pathname
  }
}

const mapDispatchToProps  = dispatch => {
  return {
    dispatch,
    handleManualLogout: (e) => {
      dispatch({ type:CLIENT_UNSET, e })
    }

  }
}

// Passing the result of mapStateToProps,
// mapDispatchToProps, and the parent props
const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign( {}, stateProps, dispatchProps, ownProps)

// Connect does not modify the component class passed to it,
// instead it returns a new, connected component class
const MainContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainComponent)

const navItems = [
  {
    name: 'user',
    content: 'ETUSIVU',
    url: '/dashboard/main'
  },
  {
    name: 'sticky-note',
    content: 'LASKUT',
    url: '/dashboard/invoice'
  },
  {
    name: 'users',
    content: 'ASIAKKAAT',
    url: '/dashboard/customer'
  },
  {
    name: 'credit-card',
    content: 'PALKAT',
    url: '/dashboard/salary'
  },
  {
    name: 'newspaper-o',
    content: 'KULUT JA KORVAUKSET',
    url: '/dashboard/fee'
  }
]

export default MainContainer

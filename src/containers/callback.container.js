import { connect } from 'react-redux'

import CallbackComponent from '../components/account/callback.component'

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

const CallbackContainer = connect(null, mapDispatchToProps)(CallbackComponent)

export default CallbackContainer

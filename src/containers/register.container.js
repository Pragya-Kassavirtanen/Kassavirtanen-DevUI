import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import Register from '../components/account/register.component'
import { registerFormSubmit, closeRegisterSnackbar } from '../actions/index'

import { registerValidate as validate } from './validate'
import { registerAsyncValidate as asyncValidate } from './asyncValidate'

/**
 *
 * @author  Skylar Kong
 *
 */

// Return a new decorated component
let RegisterContainer = reduxForm({
  form: 'register',
  validate,
  asyncValidate
})(Register)

const mapStateToProps = state => {
  return {
    registerForm: state.registerForm,
    showSpinner: state.register.showSpinner,
    showSnackbar: state.register.showSnackbar,
    showFailSnackbar: state.register.showFailSnackbar
  }
}

const mapDispatchToProps  = dispatch => {

  return {
    dispatch,
    registerFormSubmit: (email, firstname, lastname, password) => dispatch(registerFormSubmit(email, firstname, lastname, password)),
    closeRegisterSnackbar: () => dispatch(closeRegisterSnackbar())
  }
}

// Passing the result of mapStateToProps, mapDispatchToProps, and the parent props
const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign( {}, stateProps, dispatchProps, ownProps)

// Connect does not modify the component class passed to it,
// instead it returns a new, connected component class
RegisterContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(RegisterContainer)

export default RegisterContainer

import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Login from '../components/account/login.component'
import { loginFormSubmit } from '../actions/index'

/**
 * @author  Pragya Gupta
 *
 */

// Return a new decorated component
let LoginContainer = reduxForm({
  form: 'login'
})(Login)

const mapStateToProps = state => {
  return {
    loginForm: state.loginForm
  }
}

const mapDispatchToProps = dispatch => {

  return {
    dispatch,
    loginFormSubmit: (email, password) => dispatch(loginFormSubmit(email, password))    
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps)

LoginContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(LoginContainer)

export default LoginContainer

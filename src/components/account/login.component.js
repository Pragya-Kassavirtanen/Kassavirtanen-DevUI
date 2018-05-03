import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Panel } from 'react-bootstrap'
import { TextField, RaisedButton, Checkbox, FlatButton } from 'material-ui'
import FontAwesome from 'react-fontawesome'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import userManager from '../../utils/PHZUserManager'
import { loginFormSubmit } from '../../actions'

/**
 * The login view component
 *
 * @author  Pragya Gupta
 */

/****** TO BE REFACTORED ***/

const _handleGoogleLogin = e => {
  e.preventDefault()
  userManager.signinRedirect()
  console.log('done')
}

const renderTextField = ({
  input,
  label,
  hintText,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={hintText}
    style={{ textAlign: 'left' }}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const renderCheckbox = ({ input, label }) => (
  <Checkbox label={label} checked={!!input.value} onCheck={input.onChange} />
)

class LoginComponent extends Component {
  onFormSubmit = values => {
    console.log('login values:: ', values)
    this.props.loginFormSubmit(values)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="form-login-container">
          <form onSubmit={handleSubmit(this.onFormSubmit)}>
            <div>
              <Panel className="form-login-content">
                <div>
                  <FlatButton
                    backgroundColor="#3F5B96"
                    hoverColor="#3F7796"
                    icon={
                      <FontAwesome
                        style={{ color: 'white' }}
                        name="facebook-square"
                        size="2x"
                      />
                    }
                  />
                </div>
                <div className="form-register-oauth">
                  <FlatButton
                    backgroundColor="#F32E06"
                    onClick={_handleGoogleLogin}
                    hoverColor="#F25805"
                    icon={
                      <FontAwesome
                        style={{ color: 'white' }}
                        name="google-plus-square"
                        size="2x"
                      />
                    }
                  />
                </div>
                <div className="form-hr-before">
                  <hr className="form-hr" />
                </div>
                <div>
                  <Field
                    label="Sähköposti*"
                    hintText="oma.tunnus@email.fi"
                    name="email"
                    type="text"
                    component={renderTextField}
                  />
                </div>
                <div>
                  <Field
                    label="Salasana*"
                    type="password"
                    name="password"
                    component={renderTextField}
                  />
                </div>
                <div className="form-login-checkbox">
                  <Field
                    name="checkbox"
                    label="Muista minut"
                    component={renderCheckbox}
                  />
                </div>
                <div className="form-login-button">
                  <RaisedButton label="Kirjaudu" primary={true} type="submit" />
                </div>
              </Panel>

              <div className="form-login-content">
                <Panel className="form-login-register">
                  <p>
                    Eikö sinulla ole tunnusta?{' '}
                    <Link to="/dashboard/register"> Luo tunnus.</Link>{' '}
                  </p>
                </Panel>
              </div>
            </div>
          </form>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginForm: state.loginForm
  }
}

const attached = connect(mapStateToProps, { loginFormSubmit })(LoginComponent)

export default reduxForm({
  form: 'login' 
})(attached)

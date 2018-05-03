import React from 'react'
import {Field} from 'redux-form'
import {Dialog, RaisedButton, Snackbar, TextField} from 'material-ui'
import Spinner from 'react-spinner-material'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {browserHistory} from 'react-router'

/**
 * The register view
 *
 * @author  Skylar Kong
 */


class Register extends React.Component {

  render() {
    return <RegisterComponent {...this.props}/>
  }
}

const _onFormSubmit = () => {
  return false
}

const RegisterComponent = ({handleSubmit, registerFormSubmit, showSnackbar, showSpinner, closeRegisterSnackbar, showFailSnackbar}) =>

  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>
      <form onSubmit={handleSubmit(_onFormSubmit)}>
        <div className="form-register-container">
            <div className="panel panel-default panel-register">
              <div className="panel-heading">
                <h3 className="panel-title">REKISTERÖI KÄYTTÄJÄ</h3>
              </div>
              <div style={{marginBottom: '30px'}} className="panel-body">
            <div>
              <Field name="email" component={renderTextField} label="Sähköposti*" type="text"/>
            </div>
            <div>
              <Field name="firstname" component={renderTextField} label="Etunimi*" type="text"/>
            </div>
            <div>
              <Field name="lastname" component={renderTextField} label="Sukunimi*" type="text"/>
            </div>
            <div>
              <Field name="password" component={renderTextField} label="Salasana*" type="password"/>
            </div>
            <div>
              <Field name="passwordConfirmation" component={renderTextField} label="Vahvista salasana*"
                     type="password"/>
            </div>
            <div className="form-register-btn">
              <RaisedButton label="Rekisteröidy palveluun"
                            primary={true}
                            className="form-register-button"
                            type="submit"
                            onClick={registerFormSubmit}/>
            </div>
              </div>
            </div>
        </div>
      </form>
      <Snackbar
        open={showSnackbar}
        message="Käyttäjä rekisteröity"
        autoHideDuration={2500}
        bodyStyle={{backgroundColor: 'forestGreen', opacity: 0.8}}
        onRequestClose={() => {
          closeRegisterSnackbar()
          browserHistory.push('/dashboard/login')
        }}
      />
      <Snackbar
        open={showFailSnackbar}
        message="Rekisteröinti epäonnistui, tarkista kentät"
        autoHideDuration={4000}
        bodyStyle={{backgroundColor: 'red', opacity: 0.8}}
        onRequestClose={() => {
          closeRegisterSnackbar()
        }}
      />
      <Dialog
        title="Rekisteröidään käyttäjä"
        contentStyle={{width: '350px', height: '150px', textAlign: 'center'}}
        modal={true}
        open={showSpinner}>
        <Spinner width={100}
                 height={120}
                 spinnerColor={'#44C0CC'}
                 spinnerWidth={2}
                 show={showSpinner}/>
      </Dialog>
    </div>
  </MuiThemeProvider>

// Wrappers for the Material-UI
const renderTextField = ({input, label, hintText, meta: {touched, error}, ...custom}) => (
  <TextField hintText={hintText} style={{textAlign: 'left'}}
             floatingLabelText={label}
             errorText={touched && error}
             {...input}
             {...custom}
  />
)

export default Register

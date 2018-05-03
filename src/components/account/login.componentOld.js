import React from 'react'
import {Link} from 'react-router'
import {Panel} from 'react-bootstrap'
import {RaisedButton} from 'material-ui'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import userManager from '../../utils/PHZUserManager'

/**
 * The login view component
 *
 * @author  Skylar Kong
 */

/****** TO BE REFACTORED ***/


const _handlePHZLogin = e => {
  e.preventDefault()
  userManager.signinRedirect()
  console.log('done')

}

const LoginComponent = ({}) =>

  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="form-login-container">
      <form>
        <div>


          <div className="login-button-div" style={{textAlign: 'center'}}>
            <RaisedButton label="Kirjaudu palveluun" primary={true} onClick={_handlePHZLogin} style={{width: '400px'}}/>
          </div>


          <div className="form-login-content">
            <Panel className="form-login-register">
              <p>Eikö sinulla ole tunnusta? <Link to="/dashboard/register"> Luo tunnus.</Link></p>
            </Panel>
          </div>
        </div>
      </form>
    </div>
  </MuiThemeProvider>

export default LoginComponent

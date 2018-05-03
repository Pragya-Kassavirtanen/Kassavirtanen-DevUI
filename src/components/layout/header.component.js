import React from 'react'
import SecNavigation from './sec-navigation.component'
import Navigation from './navigation.component'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

/**
 * The header part of the layout
 *
 * @author Skylar Kong
 */

const Header = ({ user, navItems, handleManualLogout }) =>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    { !user || user.expired
      ? <Navigation />
      : <SecNavigation user={user} navItems={navItems} handleManualLogout= {handleManualLogout}/>
    }
  </MuiThemeProvider>

export default Header


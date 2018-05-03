require('normalize.css/normalize.css')
require('styles/sass/main.scss')

import React from 'react'

import Header from './layout/header.component'
import Account from './account/account.component'
import Footer from './layout/footer.component'

/**
 * The main component for handling user authentication requests.
 *
 * @author Skylar Kong
 */

const Main = ({ children, user, navItems, path, handleManualLogout }) => {

  return (
    <div>
      <Header user={user} navItems={navItems} handleManualLogout= {handleManualLogout}/>
      { children }
      { (!user || user.expired) &&
      ((path !== '/dashboard/register') &&
        path !== '/dashboard/login')
      && <Account/> }
      <Footer/>
    </div>
  )
}

export default Main

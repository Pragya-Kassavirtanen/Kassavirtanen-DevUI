import React from 'react'

import LogIn from './login.component'

/**
 * The log-in view
 *
 * @author  Skylar Kong
 */

const AccountComponent = ({ children }) =>
  <div>
    <LogIn/>
    {children}
  </div>

export default AccountComponent

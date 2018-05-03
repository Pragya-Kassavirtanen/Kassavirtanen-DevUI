import React from 'react'
import { Link } from 'react-router'
import NavIcon from './navicon.component'
import FontAwesome from 'react-fontawesome'
import userManager from '../../utils/PHZUserManager'

/**
 * Bootstrap styled navigation bar
 *
 * @author Skylar Kong
 */
const brandLogo = require('../../images/kassavirtanen-logo.png')
export default class Navigation extends React.Component {

  _createNavIcons = (navItems) =>
  <ul className="nav nav-tabs">
    {
      navItems.map((navItem, iter) =>
        <li key={iter}>
          <Link activeClassName="dashboard-nav-icon"
                className="dashboard-nav-linklist" to={navItem.url}>
            <NavIcon name={navItem.name} content={navItem.content}
                      size="2x"/>
          </Link>
        </li>)
    }
  </ul>

  _handleLogout = e => {
    e.preventDefault()
    // removes the user data from sessionStorage
    userManager.removeUser()    
  }

  _handleManualLogout = e => {
    e.preventDefault()   
    console.log('Inside handleManualLogout...', this.props.handleManualLogout(e))
    this.props.handleManualLogout(e)
  }

  render () {

    //let { user, navItems } = this.props
    let { navItems } = this.props
    return (
        <div className="navbar navbar-default">
          <div className="header-lined">
            <div className="container-fluid dashboard-header-emptytop"/>
            <div className="container-fluid dashboard-header-top">
                <ul className="nav nav-pills nav-justified pull-right dashboard-nav-links">
                  {/* <li>{user.profile.name}</li> */}
                  <li>
                    <Link to="/dashboard/profile">
                      ASETUKSET
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/admin">
                      HALLINTAPANEELI
                    </Link>
                  </li>
                  <li onClick={this._handleManualLogout}>
                    <Link to="/dashboard/main">
                      <FontAwesome name="unlock-alt" /> KIRJAUDU ULOS
                    </Link>
                  </li>
                </ul>
            </div>
          </div>
          <div className="container-fluid dashboard-header-bottom">
            <div className="dashboard-header-brand">
              <Link to="/dashboard/main">
                <img className="navbar-brand dashboard-nav-brand" src={brandLogo}/>
              </Link >
            </div>
            <div className="nav navbar-nav navbar-right dashboard-nav-left">
              {this._createNavIcons(navItems)}
            </div>
          </div>
        </div>
    )
  }
}

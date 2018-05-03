import React from 'react'
import { CallbackComponent } from 'redux-oidc'
import { push } from 'react-router-redux'
import userManager from '../../utils/PHZUserManager'

export default class Callback extends React.Component {

  successCallback = () => this.props.dispatch(push('/dashboard/main'))

  render() {
    return (
      <CallbackComponent userManager={userManager}
                         successCallback={this.successCallback}
                         errorCallback={this.successCallback}>
      </CallbackComponent>
    )
  }
}

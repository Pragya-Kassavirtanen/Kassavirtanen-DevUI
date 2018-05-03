import { createUserManager } from 'redux-oidc'

/**
 * The user configuration file for the Google OpenID connect provider
 *
 * @author Skylar Kong
 */

const userManagerConfig = {
  client_id: process.env.GOOGLEUSERMANAGER_CLIENT_ID,
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${process.env.GOOGLEUSERMANAGER_REDIRECT_URI}`,
  response_type: 'token id_token',
  scope: 'email profile openid',
  authority: process.env.GOOGLEUSERMANAGER_AUTHORITY,
  // In production, the silent renew path is /silentRenew.html or /dashboard/silentRenew.html depending on how the dist is configured
  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${process.env.GOOGLEUSERMANAGER_SILENT_REDIRECT_URI}`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
}

const userManager = createUserManager(userManagerConfig)

export default userManager



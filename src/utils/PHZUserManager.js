import { createUserManager } from 'redux-oidc'

/**
 * The user configuration file for the Google OpenID connect provider
 *
 */

/* const PHZUserManagerConfig = {
  client_id: process.env.PHZUSERMANAGER_CLIENT_ID,
  redirect_uri: process.env.PHZUSERMANAGER_REDIRECT_URI,
  response_type: 'token id_token',
  scope: 'openid profile email',
  authority: process.env.PHZUSERMANAGER_AUTHORITY,
  // In production, the silent renew path is /silentRenew.html or /dashboard/silentRenew.html depending on how the dist is configured
  silent_redirect_uri: process.env.PHZUSERMANAGER_SILENT_REDIRECT_URI,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
} */

const PHZUserManagerConfig = {
  client_id: '657675686025-hhvav6fgshs1ili8eugives0jvhvtts6.apps.googleusercontent.com',
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/dashboard/callback`,
  response_type: 'token id_token',
  scope: 'email profile openid',
  authority: 'https://accounts.google.com',
  // In production, the silent renew path is /silentRenew.html or /dashboard/silentRenew.html depending on how the dist is configured
  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/assets/silentRenew/silentRenew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
}

const userManager = createUserManager(PHZUserManagerConfig)
export default userManager

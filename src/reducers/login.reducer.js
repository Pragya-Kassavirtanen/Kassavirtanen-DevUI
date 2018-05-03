import { LOGIN_FORM_SUBMIT } from '../constants'

/**
 * @author  Skylar Kong
 *
 */

const loginForm = (state = {}, action) => {


  switch (action.type) {

    case LOGIN_FORM_SUBMIT:
      return Object.assign( {}, state, {
        //username: action.username, password: action.password
        email: action.email, password: action.password
      })

    default: return state

  }
}

export default loginForm

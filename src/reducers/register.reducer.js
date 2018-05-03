import { SIGNUP_FORM_SUBMIT, SIGNUP_FORM_SUBMIT_SUCCESS, SIGNUP_FORM_SUBMIT_FAILED, CLOSE_SIGNUP_SNACKBAR } from '../constants'

/**
 * @author  Skylar Kong
 *
 */

const initialState = {
  showSnackbar: false,
  showFailSnackbar: false,
  showSpinner: false
}

const registerForm = (state = initialState, action) => {

  switch (action.type) {

    case SIGNUP_FORM_SUBMIT:
      return Object.assign({}, {...state}, {showSpinner: true})

    case SIGNUP_FORM_SUBMIT_SUCCESS:     
        return Object.assign({}, {...state}, {showSpinner: false, showSnackbar: true})

    case SIGNUP_FORM_SUBMIT_FAILED:
      return Object.assign({}, {...state}, {showSpinner: false, showFailSnackbar: true})

    case CLOSE_SIGNUP_SNACKBAR:
      return Object.assign({}, state, {showSnackbar: false, showFailSnackbar: false})

    default: return state
  }
}

export default registerForm

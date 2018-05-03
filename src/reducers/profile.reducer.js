import {
  LOAD_PROFILE_SUCCESS,
  CHECK_AUTH_INFO_SUCCESS
} from '../constants'

const profileReducer = (state = {}, action) => {

  switch (action.type) {

    case CHECK_AUTH_INFO_SUCCESS:
      return Object.assign({}, {...state}, {...action.result})

    case LOAD_PROFILE_SUCCESS:
      return Object.assign({}, {...state}, {...action.result})

    default:
      return state
  }
}

export default profileReducer

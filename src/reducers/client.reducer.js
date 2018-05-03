import { CLIENT_SET, CLIENT_UNSET } from '../constants'

const initialSate = {  
  user: null
}

const clientReducer = (state = initialSate, action) => {

  switch (action.type) {

    case CLIENT_SET:
      return {       
        user: action.token
      }

    case CLIENT_UNSET:
      return {       
        user: null
      }

    default:
      return state
  }
}

export default clientReducer
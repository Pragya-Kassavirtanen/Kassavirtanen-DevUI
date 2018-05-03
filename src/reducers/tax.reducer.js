import {
  POST_TAX_CARD,
  POST_TAX_CARD_SUCCESS,
  POST_TAX_CARD_FAILED,
  GET_YEL_SUCCESS,
  GET_YEL_FAILED
} from '../constants'

const initialState = {
  showTaxCardSpinner: false,
  yel: []
}

const taxReducer = (state = initialState, action) => {

  switch (action.type) {

    case POST_TAX_CARD:
      return Object.assign({}, {...state}, {showTaxCardSpinner: true})

    case POST_TAX_CARD_SUCCESS:
      return Object.assign({}, {...state}, {showTaxCardSpinner: false})

    case POST_TAX_CARD_FAILED:
      return Object.assign({}, {...state}, {showTaxCardSpinner: false})

    case GET_YEL_SUCCESS:
      return Object.assign({}, {...state}, {yel: action.yels.data})

    case GET_YEL_FAILED:
      return Object.assign({}, {...state}, {})

    default:
      return state
  }
}


export default taxReducer


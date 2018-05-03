import{ connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import Tax from '../../components/tax/tax.component'
import { postTaxCard, getTaxCardStart } from '../../actions'

let TaxContainer = reduxForm({
  form: 'tax',
  initialValues: {
    taxCard: ' '
  }
})(Tax)


const mapStateToProps = state => {

  // const taxState = state.form.tax

  return {
    showSpinner: state.tax.showTaxCardSpinner
  }
}


const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    onFileUpload: (e) => dispatch(postTaxCard(e)),
    getTaxCardStart: () => dispatch(getTaxCardStart())
  }
}

// TODO: employ react-html-email to send a tax card to the administrator
// and save it to the backend
TaxContainer = connect(mapStateToProps, mapDispatchToProps)(TaxContainer)

export default TaxContainer

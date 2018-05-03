import{ connect } from 'react-redux'
import Admin from '../../components/admin/admin.component'
import { changeAdminMenu, expandAdminInvoice, hideAdminSnackbar, expandAdminUser } from '../../actions/index'

let AdminContainer = Admin

const mapStateToProps = state => {
  return {
    selectedMenuItem: state.admin.selectedMenuItem,
    invoiceSearchRows: state.admin.invoiceSearchRows,
    userSearchRows: state.admin.userSearchRows,
    showSpinner: state.admin.showSpinner,
    showAdminSnackbar: state.admin.showAdminSnackbar
  }
}


const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    changeAdminMenu: (value, email) => dispatch(changeAdminMenu(value, email)),
    expandAdminInvoice: (expanded, id) => dispatch(expandAdminInvoice(expanded, id)),
    hideAdminSnackbar: () => dispatch(hideAdminSnackbar()),
    expandAdminUser: (expanded, uuid) => dispatch(expandAdminUser(expanded, uuid))
  }
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign({}, stateProps, dispatchProps, ownProps)

AdminContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AdminContainer)

export default AdminContainer

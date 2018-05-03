import{ connect } from 'react-redux'
import AdminUserFilterRow from '../../components/admin/adminUserFilterRow.component'
import { reduxForm } from 'redux-form'
import { searchAdminUsers } from '../../actions/index'

let AdminUserFilterRowContainer = reduxForm({
  form: 'admin'
})(AdminUserFilterRow)

const mapStateToProps = state => {
  return {
    state
  }
}


const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    searchAdminUsers: () => dispatch(searchAdminUsers())
  }
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => Object.assign({}, stateProps, dispatchProps, ownProps)

AdminUserFilterRowContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AdminUserFilterRowContainer)

export default AdminUserFilterRowContainer

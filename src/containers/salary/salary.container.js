import { connect } from 'react-redux'

import Salary from '../../components/salary/salary.component'

const mapStateToProps = state => {
    return {
        state,
        salaryRows: state.salary.salaryRows
    }
}


const mapDispatchToProps = dispatch => {
    return {
      dispatch
    }
}


const SalaryContainer = connect(mapStateToProps, mapDispatchToProps)(Salary)

export default SalaryContainer

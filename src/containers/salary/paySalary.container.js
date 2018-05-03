import { connect } from 'react-redux'

import PaySalary from '../../components/salary/paySalary.component'

import {
  getNewSalaryStart,
  selectRowSalary,
  postSalary
} from '../../actions/index'

const mapStateToProps = state => {

  const selectedIds = state.salary.selectedRows.map(el => state.salary.newSalary[el].id)

  return {
    newSalary: state.salary.newSalary,
    taxPercent: state.salary.taxPercent,
    newSalarySummary: state.salary.newSalarySummary,
    selectedRows: state.salary.selectedRows,
    salaries: selectedIds
  }
}


const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getNewSalaryStart: () => dispatch(getNewSalaryStart()),
    selectRowSalary: selected => dispatch(selectRowSalary(selected)),
    postSalary: selected => dispatch(postSalary(selected))
  }
}


const PaySalaryContainer = connect(mapStateToProps, mapDispatchToProps)(PaySalary)

export default PaySalaryContainer

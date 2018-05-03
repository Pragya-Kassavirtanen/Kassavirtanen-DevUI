import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import NewSalarySummaryComponent from './newSalarySummary.component'
import NewSalarySelectComponent from './newSalarySelect.component'

export default class PaySalaryComponent extends React.Component {

  render() {
    return <PaySalary {...this.props}/>
  }
}

const PaySalary = ({
  getNewSalaryStart,
  selectRowSalary,
  newSalarySummary,
  taxPercent,
  selectedRows,
  newSalary,
  postSalary,
  salaries
}) =>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid">
      <div className="row">
        <div className="dashboard-content-header">
          <h1>Maksa palkka</h1>
        </div>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <hr/>
        </div>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-md-6 col-sm-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                Laskut
              </div>
              <NewSalarySelectComponent
                getNewSalaryStart={getNewSalaryStart}
                newSalary={newSalary}
                selectRowSalary={selectRowSalary}/>
            </div>
          </div>
        </div>
        {selectedRows.length > 0 ?
          <NewSalarySummaryComponent
            newSalarySummary={newSalarySummary}
            taxPercent={taxPercent}
            postSalary={postSalary}
            selectedRows={selectedRows}
            salaries={salaries}
          />
          : <div/>}
      </div>
    </div>
  </MuiThemeProvider>

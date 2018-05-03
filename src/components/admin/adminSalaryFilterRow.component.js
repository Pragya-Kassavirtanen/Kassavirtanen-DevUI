import React, { Component } from 'react'

import {
  RaisedButton,
  TableRow,
  TableRowColumn,
  Table,
  TableBody
} from 'material-ui'

import { Field } from 'redux-form'

import {
  renderTextField
} from '../../utils/wrappers'

export default class AdminSalaryFilterRow extends Component {

  render() {
    return <AdminSalaryFilterRowComponent {...this.props}/>
  }
}

const AdminSalaryFilterRowComponent = ({
}) =>
  <form>
    <Table>
      <TableBody displayRowCheckbox={false}>
        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <Field name="adminSalaryField"
                   label="Hakukenttä"
                   style={{width: '100%'}}
                   component={renderTextField}/>
          </TableRowColumn>
          <TableRowColumn>
            <RaisedButton label="Hae"
                          className="pull-right"
                          primary={true}
                          onClick={() => undefined}/>
          </TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </form>

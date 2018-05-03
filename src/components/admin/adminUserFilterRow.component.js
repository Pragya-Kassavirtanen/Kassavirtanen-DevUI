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

export default class AdminUserFilterRow extends Component {

  render() {
    return <AdminUserFilterRowComponent {...this.props}/>
  }
}

const AdminUserFilterRowComponent = ({
  searchAdminUsers
}) =>
  <form>
    <Table>
      <TableBody displayRowCheckbox={false}>
        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <Field name="adminField"
                   label="Hakukenttä"
                   style={{width: '100%'}}
                   component={renderTextField}/>
          </TableRowColumn>
          <TableRowColumn>
            <RaisedButton label="Hae"
                          className="pull-right"
                          primary={true}
                          onClick={searchAdminUsers}/>
          </TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </form>

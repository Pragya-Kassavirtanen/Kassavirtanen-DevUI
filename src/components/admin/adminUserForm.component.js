import React, { Component } from 'react'

import {
  Field
} from 'redux-form'

import {
  renderTextField
} from '../../utils/wrappers'

import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  RaisedButton
} from 'material-ui'

export default class AdminUserForm extends Component {

  render() {
    return <AdminUserFormComponent {...this.props}/>
  }
}

const AdminUserFormComponent = ({
  email,
  uuid,
  updateAdminUser
}) =>
  <form>
    <Table>
      <TableBody displayRowCheckbox={false}>
        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <Field name="account_number"
                   component={renderTextField}
                   className="dashboard-admin-textfield"
                   floatingLabelText="Tilinumero"
                   disabled={true}/>
            <Field name="city"
                   className="dashboard-admin-textfield"
                   component={renderTextField}
                   floatingLabelText="Postitoimipaikka"
                   disabled={true}/>
          </TableRowColumn>
        </TableRow>

        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <Field name="first_name"
                   className="dashboard-admin-textfield"
                   floatingLabelText="Etunimi"
                   component={renderTextField}
                   disabled={true}/>
            <Field name="last_name"
                   className="dashboard-admin-textfield"
                   component={renderTextField}
                   floatingLabelText="Sukunimi"
                   disabled={true}/>
          </TableRowColumn>
        </TableRow>

        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <Field name="job_title"
                   className="dashboard-admin-textfield"
                   component={renderTextField}
                   floatingLabelText="Ammattinimike"
                   disabled={true}/>
            <Field name="market_name"
                   className="dashboard-admin-textfield"
                   component={renderTextField}
                   floatingLabelText="Markkinointinimi"
                   disabled={true}/>
          </TableRowColumn>
        </TableRow>

        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <Field name="service_fee"
                   className="dashboard-admin-textfield"
                   component={renderTextField}
                   floatingLabelText="Palvelumaksuprosentti"/>
            <Field name="tax_percent"
                   className="dashboard-admin-textfield"
                   component={renderTextField}
                   floatingLabelText="Veroprosentti"/>
          </TableRowColumn>
        </TableRow>
        <TableRow displayBorder={false} selectable={false}>
          <TableRowColumn>
            <RaisedButton label="Tallenna"
                          className="pull-right"
                          primary={true}
                          onClick={() => updateAdminUser(uuid, email)}/>
          </TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </form>

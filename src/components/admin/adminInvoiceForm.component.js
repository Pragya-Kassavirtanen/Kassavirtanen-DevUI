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

import { SelectField } from 'redux-form-material-ui'

import { invoiceStateListItems } from '../../utils/invoice.utils'

export default class AdminInvoiceForm extends Component {

  render() {
    return <AdminInvoiceFormComponent {...this.props}/>
  }
}

const AdminInvoiceFormComponent = ({
  id,
  updateAdminInvoice
}) =>
    <form>
      <Table>
        <TableBody displayRowCheckbox={false}>
          <TableRow displayBorder={false} selectable={false}>
            <TableRowColumn>
              <Field name="invoice_reference"
                         component={renderTextField}
                         className="dashboard-admin-textfield"
                         floatingLabelText="Viitenumero"
                         disabled={true}/>
              <Field name="description"
                         className="dashboard-admin-textfield"
                         component={renderTextField}
                         floatingLabelText="Kuvaus"
                         disabled={true}/>
            </TableRowColumn>
          </TableRow>

          <TableRow displayBorder={false} selectable={false}>
            <TableRowColumn>
              <Field name="billing_date"
                         className="dashboard-admin-textfield"
                         floatingLabelText="Laskutuspäivä"
                         component={renderTextField}
                         disabled={true}/>
              <Field name="due_date"
                         className="dashboard-admin-textfield"
                         component={renderTextField}
                         floatingLabelText="Eräpäivä"
                         disabled={true}/>
            </TableRowColumn>
          </TableRow>

          <TableRow displayBorder={false} selectable={false}>
            <TableRowColumn>
              <Field name="job_title"
                         className="dashboard-admin-textfield"
                         component={renderTextField}
                         floatingLabelText="Työnimike"
                         disabled={true}/>
              <Field name="total_sum"
                         className="dashboard-admin-textfield"
                         component={renderTextField}
                         floatingLabelText="Summa"
                         disabled={true}/>
            </TableRowColumn>
          </TableRow>

          <TableRow displayBorder={false} selectable={false}>
            <TableRowColumn>
              <Field name="delivery_method"
                         className="dashboard-admin-textfield"
                         component={renderTextField}
                         floatingLabelText="Toimitustapa"
                         disabled={true}/>
              <Field name="state"
                         className="dashboard-admin-textfield"
                         component={SelectField}
                         style={{'verticalAlign': 'bottom'}}
                         floatingLabelText="Tila">
                {invoiceStateListItems}
              </Field>
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false} selectable={false}>
            <TableRowColumn>
              <RaisedButton label="Tallenna"
                            className="pull-right"
                            primary={true}
                            onClick={() => updateAdminInvoice(id)}/>
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </form>

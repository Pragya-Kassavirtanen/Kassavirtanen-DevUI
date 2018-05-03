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
  renderCheckbox,
  renderTextField,
  renderDatePicker
} from '../../utils/wrappers'

export default class AdminInvoiceFilterRow extends Component {

  render() {
    return <AdminInvoiceFilterRowComponent {...this.props}/>
  }
}

const AdminInvoiceFilterRowComponent = ({
  searchAdminInvoice
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
              <Field name="start_date_of_search"
                     component={renderDatePicker}
                     floatingLabelText="Alkupvm"
                     textFieldStyle={{width: '100%'}}
                     onChangeCallback={()=>undefined}>
              </Field>
            </TableRowColumn>
            <TableRowColumn>
              <Field name="end_date_of_search"
                     component={renderDatePicker}
                     floatingLabelText="Loppupvm"
                     textFieldStyle={{width: '100%'}}
                     onChangeCallback={()=>undefined}>
              </Field>
            </TableRowColumn>
            <TableRowColumn>
              <Field name="fast_payment" label="Pikapalkka" component={renderCheckbox}/>
              <Field name="payment_state" label="Maksettu" component={renderCheckbox}/>
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
      <RaisedButton label="Hae"
                    className="pull-right"
                    primary={true}
                    onClick={searchAdminInvoice}/>
    </form>

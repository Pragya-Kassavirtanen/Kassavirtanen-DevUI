import React from 'react'
import { Field } from 'redux-form'

import {
  TableRow,
  TableRowColumn,
  FlatButton } from  'material-ui'

import {
  renderTextField
} from '../../utils/wrappers'

import { SelectField } from 'redux-form-material-ui'

import { removeExpenseRow } from '../../actions'

import { alvPercentageItems } from '../../utils/invoice.utils'

import store from '../../store'

import FontAwesome from 'react-fontawesome'

const ExpenseInputRow = ({
  description,
  sum,
  vat,
  rowNumber,
  autoFocusIndex
}) =>
  <TableRow className="dashboard-invoice-inputrow">
    <TableRowColumn>
      {parseInt(autoFocusIndex) > 0 ?
        <Field name={description} component={renderTextField} autoFocus/> :
        <Field name={description} component={renderTextField}/>
      }
    </TableRowColumn>
    <TableRowColumn>
      <Field name={sum}
             component={renderTextField}/>
    </TableRowColumn>
    <TableRowColumn className="dashboard-invoice-select">
      <Field name={vat}
             component={SelectField}>
        {alvPercentageItems}
      </Field>
    </TableRowColumn>
    <TableRowColumn>
      <FlatButton
        secondary={true}
        onClick={() => store.dispatch(removeExpenseRow(rowNumber))}
        icon={<FontAwesome name="window-close" size="2x" />}
      />
    </TableRowColumn>
  </TableRow>

export default ExpenseInputRow

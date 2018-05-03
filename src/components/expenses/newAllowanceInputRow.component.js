import React from 'react'
import { Field } from 'redux-form'

import {
  TableRow,
  TableRowColumn,
  FlatButton } from  'material-ui'

import {
  renderTextField
} from '../../utils/wrappers'

import { removeAllowanceRow } from '../../actions'

import store from '../../store'

import FontAwesome from 'react-fontawesome'

const AllowanceInputRow = ({
  route,
  rowNumber
}) =>
  <TableRow className="dashboard-invoice-inputrow">
    <TableRowColumn>
      <Field name={route}
             component={renderTextField}
             label="Sijainti"/>
    </TableRowColumn>
    <TableRowColumn>
      <FlatButton
        secondary={true}
        onClick={() => store.dispatch(removeAllowanceRow(rowNumber))}
        icon={<FontAwesome name="window-close" size="2x" />}
      />
    </TableRowColumn>
  </TableRow>

export default AllowanceInputRow

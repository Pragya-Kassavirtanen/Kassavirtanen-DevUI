import React from 'react'
import { Field } from 'redux-form'

import {
  TableRow,
  TableRowColumn,
  FlatButton } from  'material-ui'

import {
  renderTextField,
  renderDatePicker
} from '../../utils/wrappers'

import { SelectField } from 'redux-form-material-ui'

import { unitItems, alvPercentageItems } from '../../utils/invoice.utils'

import store from '../../store'
import { removeInvoiceRow, minDateChange, maxDateChange } from '../../actions'

import FontAwesome from 'react-fontawesome'

/**
 * @author  Skylar Kong
 */

const InvoiceInputRow = ({
  description,
  startDate,
  endDate,
  quantity,
  unit,
  quantityPrice,
  vatPercent,
  sumTaxFree,
  rowNumber,
  selectedStartDate,
  selectedEndDate,
  autoFocusIndex,
  copy
}) =>
  <TableRow className="dashboard-invoice-inputrow">
    <TableRowColumn>
      {(parseInt(autoFocusIndex) > 0 && !copy) ?
        <Field name={description} component={renderTextField} autoFocus/> :
        <Field name={description} component={renderTextField}/>
      }
    </TableRowColumn>
    <TableRowColumn>
      <Field name={startDate}
             component={renderDatePicker}
             mode="landscape"
             onChangeCallback={(value) => store.dispatch(minDateChange(value, rowNumber))}
             maxDate={selectedEndDate}/>
    </TableRowColumn>
    <TableRowColumn>
      <Field name={endDate}
             component={renderDatePicker}
             mode="landscape"
             onChangeCallback={(value) => store.dispatch(maxDateChange(value, rowNumber))}
             minDate={selectedStartDate}/>
    </TableRowColumn>
    <TableRowColumn>
      <Field name={quantity}
             style={{width: '100%'}}
             component={renderTextField}/>
    </TableRowColumn>
    <TableRowColumn className="dashboard-invoice-select">
      <Field name={unit}
             style={{width: '100%', 'verticalAlign': 'bottom'}}
             component={SelectField}>
        {unitItems}
      </Field>
    </TableRowColumn>
    <TableRowColumn>
      <Field name={quantityPrice}
             style={{width: '100%'}}
             component={renderTextField}/>
    </TableRowColumn>
    <TableRowColumn className="dashboard-invoice-select">
      <Field name={vatPercent}
             style={{width: '100%', 'verticalAlign': 'bottom'}}
             component={SelectField}>
        {alvPercentageItems}
      </Field>
    </TableRowColumn>
    <TableRowColumn>
      <Field name={sumTaxFree}
             disabled={true}
             component={renderTextField}/>
    </TableRowColumn>
    <TableRowColumn>
      <FlatButton
        secondary={true}
        onClick={ () => store.dispatch(removeInvoiceRow(rowNumber)) }
        icon={<FontAwesome name="window-close" size="2x" />}
      />
    </TableRowColumn>
  </TableRow>

export default InvoiceInputRow

import React from 'react'
import { Field } from 'redux-form'

import {
  TableRow,
  TableRowColumn} from  'material-ui'

import {
  renderTextField,
  renderDatePicker
} from '../../utils/wrappers'

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
                           vatPercentDescription,
                           sumTaxFree,
                           vat,
                           sumWithVAT
}) =>
  <TableRow className="dashboard-invoice-inputrow">
    <TableRowColumn>
      <Field name={description}
             disabled={true}
             component={renderTextField}/>
    </TableRowColumn>
    <TableRowColumn>
      <Field name={startDate}
             disabled={true}
             component={renderDatePicker}
             mode="landscape"/>
    </TableRowColumn>
    <TableRowColumn>
      <Field name={endDate}
             disabled={true}
             component={renderDatePicker}
             mode="landscape"/>
    </TableRowColumn>
    <TableRowColumn>
      <Field name={quantity}
             disabled={true}
             component={renderTextField}/>
    </TableRowColumn>
    <TableRowColumn>
      <Field name={unit}
             disabled={true}
             component={renderTextField}/>
    </TableRowColumn>
    <TableRowColumn>
      <Field name={quantityPrice}
             disabled={true}
             component={renderTextField}/>
    </TableRowColumn>
    <TableRowColumn>
      <Field name={vatPercentDescription}
             disabled={true}
             component={renderTextField}/>
    </TableRowColumn>
    <TableRowColumn>
      <Field name={sumTaxFree}
             disabled={true}
             component={renderTextField}/>
    </TableRowColumn>
    <TableRowColumn>
      <Field  name={vat}
              disabled={true}
              component={renderTextField}/>
  </TableRowColumn>
    <TableRowColumn>
      <Field name={sumWithVAT}
             disabled={true}
             component={renderTextField}/>
    </TableRowColumn>
  </TableRow>
export default InvoiceInputRow

import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui'
import { Link } from 'react-router'
import store from '../../store'
import { removeCustomer, updateCustomer, addInvoiceRow } from '../../actions/index'

import FontAwesome from 'react-fontawesome'

const CustomerRow = ({
  customer_id,
  companyName,
  contactPersonName,
  contactPersonEmail,
  address,
  zipCode,
  city 
}) => (
  <TableRow key={ customer_id }>
    <TableRowColumn>{companyName}</TableRowColumn>
    <TableRowColumn>{contactPersonName}</TableRowColumn>
    <TableRowColumn>{contactPersonEmail}</TableRowColumn>
    <TableRowColumn>
      {`${address}\n${zipCode} ${city.toUpperCase()}`}
    </TableRowColumn>
    <TableRowColumn>
      <div style={{ display: 'flex' }}>       
        <Link>
          <p
            style={{ marginLeft: '10px' }}
            onClick={() => {
              store.dispatch(updateCustomer( customer_id ))
            }}
          >
            <FontAwesome name="pencil" />
          </p>
        </Link>
        <Link>
          <p
            style={{ marginLeft: '10px' }}
            onClick={() => { store.dispatch(removeCustomer( customer_id )) }}>
            <FontAwesome name="window-close" />
          </p>
        </Link>
        <Link>
          <p
            style={{ marginLeft: '10px' }}
            onClick={() => { store.dispatch(addInvoiceRow( customer_id )) }}>
            <FontAwesome name="plus" />
          </p>
        </Link>
      </div>
    </TableRowColumn>
  </TableRow>
)


export default CustomerRow
import React from 'react'
import { Field, reset } from 'redux-form'
import { Link } from 'react-router'

import {
  RaisedButton,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  Divider,
  MenuItem
} from  'material-ui'

import ReactPaginate from 'react-paginate'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import {
  renderTextField,
  renderCheckbox,
  renderDatePicker
} from '../../utils/wrappers'

import { SelectField } from 'redux-form-material-ui'

import InvoiceInputTable from './invoiceInputTable.component'

/**
 * @author  Skylar Kong
 */

export default class NewInvoiceComponent extends React.Component {

  componentWillMount() {
    this.props.getInvoicesStart()
  }

  render() {
    return <NewInvoice {...this.props}/>
  }
}

const _onFormSubmit = (values, e) => {
  e.preventDefault()

  console.log(values)
}

const NewInvoice = ({
  countryItems,
  invoiceItems,
  overdueItems,
  titleItems,
  invoiceInputRows,
  invoiceRows,
  invoicePages,
  invoicePageChange,
  addInvoiceRow,
  invalid,
  handleSubmit,
  changeInvoiceBillingDate,
  customers,
  selectInvoiceCustomer,
  dispatch
}) =>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid">
      <div className="row">
        <div className="dashboard-content-header">
          <h1>LUOMASI LASKUT</h1>
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr/>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-xs-12 col-sm-12 col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Luomasi laskut</h3>
              </div>
              <div className="panel-body">
                {createdInvoiceRows(invoiceRows, invoicePages, invoicePageChange)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <h1>LUO UUSI LASKU</h1>
          <Field name="select-invoice-customer"
                 className="pull-right dashboard-content-select-customer"
                 component={SelectField}
                 floatingLabelText="Asiakas"
                 style={{'marginTop': '25px', 'marginRight': '20px'}}
                 maxHeight={200}
                 onChange={(e, i) => i >= 0 ? selectInvoiceCustomer(customers.filter(el => (i === el.id)).pop()) : dispatch(reset('invoice'))}>
            {_createCustomerMenuItems(customers)}
          </Field>
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr/>
      </div>
      <form onSubmit={handleSubmit(_onFormSubmit)}>
        <div className="row">
            <div className="dashboard-content-header">
              <div className="col-xs-12 col-sm-6 col-lg-4">
                {customerInfo(countryItems)}
              </div>
              <div className="col-xs-12 col-sm-6 col-lg-4">
                {invoiceDeliveryMethod(invoiceItems)}
              </div>
                <div className="col-xs-12 col-sm-12 col-lg-4">
                  {invoiceInfo(overdueItems, titleItems, changeInvoiceBillingDate)}
                </div>
            </div>
        </div>
        <div className="row">
          <div className="dashboard-content-header">
            <div className="col-xs-12 col-sm-12 col-lg-12">
              {invoiceAdditionalInformation()}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="dashboard-content-header">
            <div className="col-xs-12 col-sm-12 col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Laskutettavat tuotteet/palvelut</h3>
                </div>
                <InvoiceInputTable rows={invoiceInputRows} addInvoiceRow={addInvoiceRow}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="dashboard-content-header">
            <div className="col-xs-12 col-sm-12 col-lg-12">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="pull-right">
                    { invalid
                      ? <RaisedButton label="Esikatsele ja hyväksy lasku"
                                      primary={true}
                                      type="submit"/>
                      : <RaisedButton label="Esikatsele ja hyväksy lasku"
                          primary={true}
                          type="submit"
                          containerElement={<Link to="/dashboard/invoice/review"/>}/>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </MuiThemeProvider>

const customerInfo = (countryItems) =>
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Asiakkaan yhteystiedot</h3>
    </div>
    <div className="panel-body" style={{marginBottom: '25px'}}>
      <div>
        <Field name="country"
               component={SelectField}
               floatingLabelText="Maa *"
               maxHeight={200}>
          {countryItems}
        </Field>
      </div>
      <div>
        <Field name="company_name" component={renderTextField}
               label="Yrityksen nimi *"/>
      </div>
      <div>
        <Field name="business_id" component={renderTextField}
               label="Y-Tunnus *"/>

      </div>
      <div>
        <Field name="person_to_contact" component={renderTextField}
               label="Yhteyshenkilön nimi *"/>
      </div>
      <div>
        <Field name="person_to_contact_email" component={renderTextField}
               label="Yhteyshenkilön sähköposti *"/>
      </div>
    </div>
  </div>

const invoiceDeliveryMethod = (invoiceItems) =>
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Laskun toimitustapa</h3>
    </div>
    <div className="panel-body" style={{marginBottom: '25px'}}>
      <div>
        <Field name="delivery_method"
               component={SelectField}
               floatingLabelText="Laskun toimitustapa *">
          {invoiceItems}
        </Field>
      </div>
      <div>
        <Field name="delivery_address"
               component={renderTextField}
               label="Laskutusosoite"/>
      </div>
      <div>
        <Field name="zip_code" component={renderTextField}
               label="Postinumero"/>
      </div>
      <div>
        <Field name="city" component={renderTextField}
               label="Postitoimipaikka"/>
      </div>
      <div>
        <Field name="finvoice_address" component={renderTextField}
               label="Verkkolaskuosoite"/>
      </div>
    </div>
  </div>

const invoiceInfo = (overdueItems, titleItems, changeInvoiceBillingDate) =>
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Laskun tiedot</h3>
    </div>
    <div className="panel-body">
      <div>
        <div className="dashboard-invoice-info-half">
          <Field name="billing_date"
                 onChangeCallback={changeInvoiceBillingDate}
                 component={renderDatePicker}
                 style={{width: '50%'}}
                 floatingLabelText="Laskutuspäivä"/>
        </div>
        <div className="dashboard-invoice-info-half">
          <Field name="overdue"
                 component={SelectField}
                 style={{width: '70%'}}
                 floatingLabelText="Maksuehto">
            {overdueItems}
          </Field>
        </div>
      </div>
      <div>
        <Field name="due_date"
               component={renderTextField}
               disabled={true}
               label="Eräpäivä"/>
      </div>
      <div>
        <Field name="invoice_reference"
               component={renderTextField}
               label="Yrityksen toivoma viite"/>
      </div>
      <div>
        <Field name="description"
               component={renderTextField}
               label="Vapaamuotoinen teksti *"
               multiLine={true} rows={2}/>
      </div>
      <div>
        <Field name="job_title"
               component={SelectField}
               maxHeight={200}
               floatingLabelText="Valitse ammattinimike">
          {titleItems}
        </Field>
      </div>
    </div>
  </div>

const invoiceAdditionalInformation = () =>
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Laskun lisätiedot</h3>
    </div>
    <div className="panel-body">
      <Field name="instant_payment"
             component={renderCheckbox}
             maxHeight={200}
             label="Pikapalkka">
      </Field>
    </div>
  </div>

const createdInvoiceRows = (invoiceRows, invoicePages, invoicePageChange) =>
  <div>
    <Table selectable={false} >
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Asiakas</TableHeaderColumn>
          <TableHeaderColumn>Laskunro.</TableHeaderColumn>
          <TableHeaderColumn>Laskutuspäivä</TableHeaderColumn>
          <TableHeaderColumn>Eräpäivä</TableHeaderColumn>
          <TableHeaderColumn>Summa</TableHeaderColumn>
          <TableHeaderColumn>Pikapalkka</TableHeaderColumn>
          <TableHeaderColumn>Tila</TableHeaderColumn>
          <TableHeaderColumn>Toiminnot</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {invoiceRows}
      </TableBody>
    </Table>
    <Divider />
    <ReactPaginate
      previousLabel={<i className='fa fa-chevron-left'/>}
      nextLabel={<i className='fa fa-chevron-right'/>}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={invoicePages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={invoicePageChange}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'} />
  </div>

const _createCustomerMenuItems = (customers) =>
  customers.map(c =>
    <MenuItem key={c.id}
              value={c.id}
              primaryText={c.company_name}/>
  )


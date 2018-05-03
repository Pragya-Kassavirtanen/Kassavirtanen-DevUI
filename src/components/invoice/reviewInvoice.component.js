import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Field } from 'redux-form'
import { Link, browserHistory } from 'react-router'
import {
  RaisedButton,
  Snackbar,
  Dialog
} from 'material-ui'
import Spinner from 'react-spinner-material'

import { renderTextField, renderCheckbox } from '../../utils/wrappers'
import ReviewInvoiceInputTable from './reviewInvoiceInputTable.component'

export default class InvoiceRetro extends React.Component {
  componentWillMount() {
    this.props.loadInvoiceReview()
  }

  render() {
    return <ReviewInvoiceComponent { ...this.props }/>
  }
}

const ReviewInvoiceComponent = ({invoiceRows, saveAndSendInvoice, apiSuccess, closeSnackbar, saveInvoiceDraft, showSpinner}) =>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid">
      <div className="row">
        <div className="dashboard-content-header">
          <h1>Esikatselu</h1>
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr/>
      </div>
        <div className="row">
          <div className="dashboard-content-header">
            <div className="col-xs-12 col-sm-6 col-lg-4">
              {ReviewCustomerInfo()}
            </div>
            <div className="col-xs-12 col-sm-6 col-lg-4">
              {ReviewInvoice()}
            </div>
            <div className="col-xs-12 col-sm-12 col-lg-4">
              {ReviewInvoiceInfo()}
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
                <ReviewInvoiceInputTable invoiceRows={invoiceRows}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="dashboard-content-header">
            <div className="col-xs-12 col-sm-12 col-lg-12">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="pull-left">
                    <RaisedButton label="<< Takaisin"
                                  primary={true}
                                  containerElement={<Link to="/dashboard/invoice"/>}/>
                  </div>
                  <div className="pull-right">
                    <RaisedButton label="Tallenna ja lähetä"
                                  onClick={saveAndSendInvoice}
                                  primary={true}/>
                  </div>
                  <div className="pull-right">
                    <RaisedButton label="Tallenna luonnos"
                                  onClick={saveInvoiceDraft}
                                  primary={true}
                                  style={{'marginRight': '10px'}}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Snackbar
        open={apiSuccess}
        message="Lasku tallennettu ja lähetetty!"
        autoHideDuration={2000}
        bodyStyle={{backgroundColor: 'forestGreen', opacity: 0.8}}
        onRequestClose={() => {
          closeSnackbar()
          browserHistory.push('/dashboard/invoice')
        }}
      />
      <Dialog
        title="Lähetetään laskua"
        contentStyle={{width: '350px', height: '150px', textAlign: 'center'}}
        modal={true}
        open={showSpinner}
      >
        <Spinner width={100}
                 height={120}
                 spinnerColor={'#44C0CC'}
                 spinnerWidth={2}
                 show={showSpinner} />
      </Dialog>
    </div>
  </MuiThemeProvider>

const ReviewInvoice = () =>
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Laskun esikatselu</h3>
    </div>
    <div className="panel-body" style={{marginBottom: '25px'}}>
      <div>
        <Field name="delivery_method"
               component={renderTextField}
               label="Laskun toimitustapa *"
               disabled={true}/>
      </div>
      <div>
        <Field name="delivery_address"
               component={renderTextField}
               label="Laskutusosoite"
               disabled={true}/>
      </div>
      <div>
        <Field name="zip_code" component={renderTextField}
               label="Postinumero"
               disabled={true}/>
      </div>
      <div>
        <Field name="city" component={renderTextField}
               label="Postitoimipaikka"
               disabled={true}/>
      </div>
      <div>
        <Field name="finvoice_address" component={renderTextField}
               label="Verkkolaskuosoite"
               disabled={true}/>

      </div>
    </div>
  </div>

const ReviewCustomerInfo = () =>
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Asiakkaan yhteystiedot</h3>
    </div>
    <div className="panel-body" style={{marginBottom: '25px'}}>
      <div>
        <Field name="country"
               component={renderTextField}
               label="Maa *"
               disabled={true}/>
      </div>
      <div>
        <Field name="company_name" component={renderTextField}
               label="Yrityksen nimi *"
               disabled={true}/>
      </div>
      <div>
        <Field name="business_id" component={renderTextField}
               label="Y-Tunnus *"
               disabled={true}/>

      </div>
      <div>
        <Field name="person_to_contact" component={renderTextField}
               label="Yhteyshenkilön nimi *"
               disabled={true}/>
      </div>
      <div>
        <Field name="person_to_contact_email" component={renderTextField}
               label="Yhteyshenkilön sähköposti *"
               disabled={true}/>
      </div>
    </div>
  </div>

const ReviewInvoiceInfo = () =>
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Laskun tiedot</h3>
    </div>
    <div className="panel-body">
      <div className="dashboard-invoice-info-half">
        <Field name="billing_date"
               component={renderTextField}
               label="Laskutuspäivä"
               disabled={true}
               style={{'width': '50%'}}/>
      </div>
      <div className="dashboard-invoice-info-half">
        <Field name="overdue"
               component={renderTextField}
               label="Maksuehto"
               disabled={true}
               style={{'width': '50%'}}/>
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
               label="Yrityksen toivoma viite"
               disabled={true}/>
      </div>
      <div>
        <Field name="description"
               component={renderTextField}
               label="Vapaamuotoinen teksti *"
               multiLine={true} rows={2}
               disabled={true}/>
      </div>
      <div>
        <Field name="job_title"
               component={renderTextField}
               label="Valitse ammattinimike"
               disabled={true}/>
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
             disabled={true}
             label="Pikapalkka">
      </Field>
    </div>
  </div>

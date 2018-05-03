import React from 'react'
import { Field } from 'redux-form'

import { RaisedButton, MenuItem, TextField } from 'material-ui'
import { countryItems } from '../../utils/invoice.utils'

import {
  renderTextField,
  renderSelectField,
  renderCheckbox
} from '../../utils/wrappers'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const _createMenuItems = menuItems =>
  menuItems.map((item, index) => <MenuItem key={index} value={item} primaryText={item}/>)

const customers = [ 'Yksi', 'Kaksi', 'Kolme' ]
const customerList = _createMenuItems(customers)

const InvoiceEdit = ({}) =>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid">
      <div className="row">
        <div className="dashboard-content-header">
          <h1>Muokkaa laskua</h1>
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr/>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-xs-8 col-sm-8 col-lg-8">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h2>Asiakkaan yhteystiedot</h2>
              </div>
              <form>
                <div className="panel-body">
                  <Field name="customer_id" label="Asiakas" component={renderSelectField}>{customerList}</Field>
                  <hr/>
                  <div className="formSplit">
                    <Field name="billing" label="Laskutan" component={renderSelectField}>{customerList}</Field>
                    <Field name="country" label="Maa*" component={renderSelectField}>{countryItems}</Field>
                    <Field name="company_name" label="Yrityksen nimi*" component={renderTextField}/>
                    <Field name="company_id" label="Y-Tunnus*" component={renderTextField}/>
                    <Field name="contact_name" label="Yhteyshenkilön nimi*" component={renderTextField}/>
                    <Field name="contact_email" label="Yhteyshenkilön sähköposti" component={renderTextField}/>
                  </div>
                  <div className="formSplit">
                    <Field name="invoice_delivery" label="Laskun toimitustapa*" component={renderSelectField}>{customerList}</Field>
                    <Field name="billing_address" label="Laskutusosoite*" component={renderTextField}/>
                    <Field name="zip_code" label="Postinumero*" component={renderTextField}/>
                    <Field name="city" label="Postitoimipaikka*" component={renderTextField}/>
                    <Field name="billing_email" label="Verkkolaskuosoite" component={renderTextField}/>
                  </div>
                  <p style={{marginTop:'10px'}}>Maksunvalvonta, maksumuistutukset ja perintä</p>
                  <Field name="take_care" label="Haluan, että Kassavirtanen.fi huolehtii maksunvalvonnasta, maksumuistutuksista ja tarvittaessa perinnästä" component={renderCheckbox}/>
                  <Field name="no_care" label="Laskusta ei saa lähettää maksumuistutuksia, eikä laskua saa laittaa perintään" component={renderCheckbox}/>
                  <div className="divider">
                    <p style={{marginRight:'10px'}}>Muut vastaanottajat</p>
                    <RaisedButton label="+" primary={true}/>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-lg-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Ohjeet</h3>
              </div>
              <div className="panel-body">
                <p>Valitse asiakas, tai syötä tiedot lomakkeelle.</p>
                <p><span style={{fontWeight: 'bold'}}>Y-Tunnus:</span> Tunnuksen voit tarkistaa helposti osoitteessa www.ytj.fi.</p>
                <p><span style={{fontWeight: 'bold'}}>Yrityksen nimi:</span> Asiakasyrityksen nimi kokonaisuudessaan.</p>
                <p><span style={{fontWeight: 'bold'}}>Yhteyshenkilön sähköposti:</span> Asiakkaasi yhteyshenkilön sähköpostiosoite.Palvelusta lähetetään viestit sekä lasku tähän osoitteeseen.</p>
                <p><span style={{fontWeight: 'bold'}}>Laskun toimitustapa:</span></p>
                <p><span style={{fontWeight: 'bold'}}>Sähköpostitse:</span> Lasku toimitetaan vain sähköpostilla.</p>
                <p><span style={{fontWeight: 'bold'}}>Postitse:</span> Lasku toimitetaan asiakkaalle postitse ja laskusta lähetetään ennakkoilmoitus sähköpostilla.</p>
                <p><span style={{fontWeight: 'bold'}}>Verkkolasku:</span> Lasku toimitetaan verkkolaskuna.</p>
                <p><span style={{fontWeight: 'bold'}}>Laskutusosoite:</span> Asiakasyrityksen paperilasku lähetetään tähän osoitteeseen. Osoite vaaditaan mahdollisia maksumuistutuksia ja perintää varten</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-xs-8 col-sm-8 col-lg-8">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h2>Laskun tiedot</h2>
              </div>
              <form>
                <div className="panel-body">
                  <div className="formSplit">
                    <Field name="terms" label="Maksuehdot" component={renderSelectField}>{customerList}</Field>
                    <Field name="due_date" label="Eräpäivä" component={renderTextField}/>
                    <Field name="reference" label="Yrityksen toivoma viite" component={renderTextField}/>
                    <TextField name="open_text" hintText="Vapaamuotoinen teksti laskun alkuun:*" rows={4} rowsMax={4} style={{fontWeight: 'bold'}}/>
                    <Field name="job_name" label="Valitse ammattinimike" component={renderSelectField}/>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-lg-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Ohjeet</h3>
              </div>
              <div className="panel-body">
                <p><span style={{fontWeight: 'bold'}}>Maksuehto:</span> Aika johon mennessä asiakkaasi lasku erääntyy. Esim. jos maksuehto on 7 päivää, tulee laskun eräpäiväksi viikko laskunluontipäivästä.
                  (Huom! Yksityishenkilöiden minimimaksuaika on 14 vrk.)</p>
                <p><span style={{fontWeight: 'bold'}}>Yrityksen toivoma viite:</span> Joskus yritykset haluavat viitteeksi esim. tilauksesta vastaavan henkilön tai projektin nimen.</p>
                <p><span style={{fontWeight: 'bold'}}>Vapaamuotoinen teksti:</span> Tämä teksti tulee näkyviin laskulle ennen varsinaisia laskurivejä. Tässä voit esim. tarkentaa laskutusperusteita. Tämä vaaditaan mahdollisia maksumuistutuksia ja perintää varten.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pull-right">
        <RaisedButton type="submit" label="Päivitä yhteystiedot" primary={true}/>
      </div>
    </div>
  </MuiThemeProvider>

export default InvoiceEdit

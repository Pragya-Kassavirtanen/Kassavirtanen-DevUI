import React from 'react'
import {Field} from 'redux-form'

import RaisedButton from 'material-ui/RaisedButton'

import {
  renderTextField,
  renderCheckbox
} from '../../utils/wrappers'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import TaxContainer from '../../containers/tax/tax.container'

export default class ProfileComponent extends React.Component {

  componentWillMount() {
    this.props.loadProfileStart()
  }

  render() {
    return <Profile {...this.props}/>
  }
}

const Profile = ({handleSubmit, onProfileUpdate, invalid}) =>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid">
      <div className="row">
        <div className="dashboard-content-header">
          <h1>Muokkaa omia tietojasi</h1>
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr/>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-xs-8 col-sm-8 col-lg-8">
            <div className="panel panel-default">
              <form onSubmit={handleSubmit(() => onProfileUpdate())}>
                <div className="panel-body">
                  <div className="formSplit">
                    <Field name="last_name" label="Sukunimi*" disabled={true} component={renderTextField}/>
                    <Field name="first_name" label="Etunimi*" disabled={true} component={renderTextField}/>
                    <Field name="phone" label="Puhelinnumero*" component={renderTextField}/>
                    <Field name="account_number" label="Tilinumero IBAN-muodossa*" component={renderTextField}/>
                    <div className="divider">
                      <Field name="show_phone" label="Näytä puhelinnumero laskulla" component={renderCheckbox}/>
                    </div>
                  </div>
                  <div className="formSplit">
                    <Field name="address" label="Osoite*" component={renderTextField}/>
                    <Field name="zip_code" label="Postinumero*" component={renderTextField}/>
                    <Field name="city" label="Postitoimipaikka*" component={renderTextField}/>
                    <Field name="market_name" label="Markkinointinimi" component={renderTextField}/>
                    <Field name="job_title" label="Ammattinimike" component={renderTextField}/>
                  </div>
                    <div className="button-pull">
                      {submitButton(invalid)}
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
                <p>Syötä yhteystietosi lomakkeelle. Syötä myös markkinointinimesi, jos haluat sen näkymään laskulle.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <TaxContainer/>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <h1>Vaihda salasana</h1>
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr/>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-xs-8 col-sm-8 col-lg-8">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="formSplit">
                  <Field name="current_pw" label="Nykyinen salasana" component={renderTextField}/>
                  <Field name="new_pw" label="Uusi salasana" component={renderTextField}/>
                  <Field name="check_pw" label="Toista uusi salasana" component={renderTextField}/>
                </div>
              </div>
              <div className="panel-footer is-plain clearfix">
                <div className="button-pull">
                  <RaisedButton type="submit" disabled={true} label="Vaihda salasana" primary={true}/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-lg-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Ohjeet</h3>
              </div>
              <div className="panel-body">
                <p>Salasanan tulee sisältää vähintään:</p>
                <ul>
                  <li>8 merkkiä</li>
                  <li>pieniä ja isoja kirjaimia</li>
                  <li>numeroita</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="dashboard-content-header">
          <h1>Salasana hukassa?</h1>
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr/>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-xs-8 col-sm-8 col-lg-8">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="formSplit">
                  <Field name="email"
                         disabled={true}
                         label="Sähköpostiosoite"
                         component={renderTextField}/>
                </div>
              </div>
              <div className="panel-footer is-plain clearfix">
                <div className="button-pull">
                  <RaisedButton type="submit" disabled={true} label="Palauta salasana" primary={true}/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-lg-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Ohjeet</h3>
              </div>
              <div className="panel-body">
                <p>Oletko unohtanut salasanasi? Tilaa uusi salasana antamalla sähköpostiosoitteesi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MuiThemeProvider>

const submitButton = (invalid) =>
  <div>
    { invalid
      ? <RaisedButton label="Päivitä yhteystiedot"
                      primary={true}
                      type="submit"/>
      : <RaisedButton label="Päivitä yhteystiedot"
                      primary={true}
                      type="submit"/>
    }
  </div>

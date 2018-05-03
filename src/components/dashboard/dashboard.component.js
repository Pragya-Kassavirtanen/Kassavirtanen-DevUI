import React from 'react'

import { RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FontAwesome from 'react-fontawesome'

/**
 * The dashboard component to be viewed after user has
 * successfully sign in.
 *
 * @author  Skylar Kong
 */

export default class Dashboard extends React.Component {

/*   componentWillMount() {
    this.props.checkAuthInfo()
  } */

  render() {
    return <DashboardComponent {...this.props}/>
  }
}

const DashboardComponent = ({ onCreateInvoice, onCreateCustomer }) =>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="container-fluid">
      <div className="row">
        <div className="dashboard-content-header">
          <h1>Tapahtuma</h1>
          <ul className="nav nav-pills pull-right">
            <li><RaisedButton label="LUO LASKU" primary={true} onClick={onCreateInvoice}/></li>
            <li><RaisedButton label="LISÄÄ ASIAKAS" primary={true} onClick={onCreateCustomer}/></li>
          </ul>
        </div>
      </div>
      <div className="dashboard-content-header">
        <hr/>
      </div>
      <div className="row">
        <div className="dashboard-content-header">
          <div className="col-xs-12 col-sm-8 col-lg-8">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Otsikko</h3>
              </div>
              <div style={{marginBottom: '75px'}} className="panel-body">
                <p>Otsikko teksti</p>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-4 col-lg-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Laskutus</h3>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  <li className="list-group-item">
                    Otsikko teksti
                    <span className="pull-right">0,00 €</span>
                  </li>
                  <li className="list-group-item">
                    Otsikko teksti
                    <span className="pull-right">0,00 €</span>
                  </li>
                  <li className="list-group-item">
                    Otsikko teksti
                    <span className="pull-right">0,00 €</span>
                  </li>
                </ul>
                <div>
                  <RaisedButton style={{marginTop: '50px', marginBottom: '10px'}} className="pull-right" label="MAKSA PALKKA" primary={true}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="dashboard-content-bottom">
            <div className="col-xs-12 col-sm-4 col-lg-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Laskut</h3>
                </div>
                <div style={{marginBottom: '75px'}} className="panel-body">
                  <p>Otsikko teksti</p>
                </div>
                <div className="panel-footer">
                  <p>NÄYTÄ KAIKKI</p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-4 col-lg-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Kulut ja korvaukset</h3>
                </div>
                <div style={{marginBottom: '75px'}} className="panel-body">
                  <p>Otsikko teksti</p>
                </div>
                <div className="panel-footer">
                  <p>NÄYTÄ KAIKKI</p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-4 col-lg-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Omat tiedot</h3>
                </div>
                <div style={{marginBottom: '85px'}} className="panel-body">
                  <ul className="list-group">
                    <li className="list-group-item">
                      Otsikko teksti
                      <span className="pull-right">0,00 €</span>
                    </li>
                    <li className="list-group-item">
                      Otsikko teksti
                      <span className="pull-right">0,00 €</span>
                    </li>
                    <li className="list-group-item">
                      Otsikko teksti
                      <span className="pull-right">0,00 €</span>
                    </li>
                  </ul>
                </div>
                <div className="panel-footer">
                  <p>
                    <span><FontAwesome name="gear"/> </span> ASETUKSET
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MuiThemeProvider>

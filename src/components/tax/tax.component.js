import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { renderTextField, renderInputFile } from '../../utils/wrappers'
import { Field } from 'redux-form'
import { RaisedButton, Dialog } from 'material-ui'
import Spinner from 'react-spinner-material'
import YelContainer from '../../containers/tax/yel.container'


class Tax extends React.Component {

  componentWillMount() {
    this.props.getTaxCardStart()
  }

  render() {
    return <TaxComponent {...this.props}/>
  }
}



const TaxComponent = ({ onFileUpload, showSpinner }) =>

  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>
        <div className="container-fluid">
          <div className="row">
            <div className="dashboard-content-header">
              <h1>Verokortti ja YEL</h1>
            </div>
          </div>
          <div className="dashboard-content-header">
            <hr/>
          </div>
          <div className="row">
            <div className="dashboard-content-header">
              <div className="col-xs-12 col-sm-6 col-lg-6">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Verokortti</h3>
                  </div>
                  <div className="panel-body">
                    <p>Lähetä meille verokorttisi helposti sähköisessä muodossa alla olevan lomakkeen kautta.</p>
                    <div className="dashboard-tax-content">
                      <p>Sallitut tiedostotyypit: jpg, jpeg, png, pdf</p>
                      <form>
                        <Field name="taxCard"
                               label="Oma verokortti"
                               disabled={true}
                               component={renderTextField}/>
                        <div className="pull-right">
                          <RaisedButton
                            label="Lisää verokortti"
                            primary={true}
                            containerElement={<label htmlFor="input-tax"></label>}/>
                          <div className="dashboard-tax-input">
                            <Field name="inputFile"
                                   component={renderInputFile}
                                   id="input-tax"
                                   onChange={onFileUpload}/>
                            {/*<input id="input-tax" type="file" onChange={(e) => onInputChange(e)}/>*/}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div>
                    <p className="dashboard-tax-description">Voit lähettää verokorttisi myös postitse tai sähköpostitse.</p>
                    <p className="dashboard-tax-address">
                      Lähetä verokortti postilla osoitteeseen:<br/>
                      Kassavirtanen Oy / Kassavirtanen.fi<br/>
                      Salomonkatu 16<br/>
                      00180 Helsinki<br/>
                      <br/><br/>
                      Tai sähköpostitse:<br/>
                      verokortit@kassavirtanen.fi
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <YelContainer/>
          </div>
        </div>
      <Dialog
        title="Lähetetään verokorttia"
        contentStyle={{width: '350px', height: '150px', textAlign: 'center'}}
        modal={true}
        open={showSpinner}
      >
        <Spinner width={100}
                 height={120}
                 spinnerColor={'#44C0CC'}
                 spinnerWidth={2}
                 show={showSpinner}/>
      </Dialog>
    </div>
  </MuiThemeProvider>

Tax.defaultProps = {
  fileTypeRegex: /\.(pdf|jpg|png)/
}

export default Tax

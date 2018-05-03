import React from 'react'
import { Link } from 'react-router'
import MailTo from 'react-mailto'
import NavIcon from './navicon.component'

/**
 * @author Skylar Kong
 *
 */

// FIXME: TO BE REFACTORED

const Footer = () =>
<footer className="dashboard-footer">
  <div className="dashboard-footer-info">
    <div className="row">
      <article className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
        <h3>kassavirtanen</h3>
        <ul>
          <li>Kassavirtanen Oy</li>
          <li>Xxxkatu XX A,</li>
          <li>00120 HELSINKI</li>
          <li>Y-tunnus: 1234567-1</li>
        </ul>
      </article>
      <article className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
        <h5>Navigointi</h5>
        <ul>
          <li><Link to="/">Etusivu</Link></li>
          <li><Link to="/#">Kenelle palvelu sopii?</Link></li>
          <li><Link to="/#">Usein kysyttyä</Link></li>
          <li><Link to="/#">Toimeksiantajalle</Link></li>
          <li><Link to="/#">Yhteystiedot</Link></li>
          <li><Link to="/#">Palkkalaskuri</Link></li>
          <li><Link to="/#">In english</Link></li>
        </ul>
      </article>
      <article className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
        <h5>Tietoa palvelusta</h5>
        <ul>
          <li><Link to="/#">Blogi</Link></li>
          <li><Link to="/#">Yhteistyökumppanit</Link></li>
          <li><Link to="/#">Medialle</Link></li>
          <li><Link to="/#">Rekisteriseloste</Link></li>
          <li><Link to="/#">Tietoa evästeistä</Link></li>
          <li><Link to="/#">Artikkelipankki</Link></li>
        </ul>
      </article>
      <article className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
        <h5>Asiakaspalvelu</h5>
        <ul>
          <li><Link to="/#">Puh. 09 0000 000</Link></li>
          <li><MailTo email="asiakaspalvelu@kassavirtanen.fi">asiakaspalvelu@kassavirtanen.fi</MailTo></li>
          <li><Link to="/#">Lähetä viesti</Link></li>
          <li><Link to="/#">Yhteydenottolomakkeella</Link></li>
          <li><Link to="/#">Ohjeet verokortin toimitukseen</Link></li>
        </ul>
      </article>
    </div>
    <div className="row">
      <div className="dashboard-footer-some">
        <article>
          <ul className="nav nav-pills nav-justified ">
            <li><NavIcon sectionClass="dashboard-footer-icon" name="facebook-official" size="2x"/></li>
            <li><NavIcon sectionClass="dashboard-footer-icon" name="twitter" size="2x"/></li>
            <li><NavIcon sectionClass="dashboard-footer-icon" name="instagram" size="2x"/></li>
            <li><NavIcon sectionClass="dashboard-footer-icon" name="snapchat-ghost" size="2x"/></li>
          </ul>
        </article>
      </div>
    </div>
    <div className="dashboard-footer-sign">
      <p> &copy; kassavirtanen 2016</p>
    </div>
  </div>
</footer>

export default Footer

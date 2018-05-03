import React from 'react'
import { MenuItem } from 'material-ui'

const alvList = [
  { alv: 24, description: '24% Pääsääntöisesti työsuoritteet laskutetaan tällä verokannalla' },
  { alv: 10, description: '10% Kulttuuri- ja viihdetilaisuuksien lipunmyynti (AVL 85a§)' },
  { alv: 10, description: '10% Taide-esineen myynti (AVL 85a§)' },
  { alv: 10, description: '10% Liikunnanohjausta yksityisasiakkaalle (AVL 85a§)' },
  { alv: 0, description: '0% Rakennusalan käänteinen alv (AVL 8c§)' },
  { alv: 0, description: '0% Taiteilijan palkkio (AVL 45§)' },
  { alv: 0, description: '0% Terveyden- ja sairaanhoitopalvelu (AVL 34§ 1. mom)' },
  { alv: 0, description: '0% Koulutetun hierojan palvelu (AVL 34§ 1. mom)' },
  { alv: 0, description: '0% Sosiaalialan työ (AVL 37§)' },
  { alv: 0, description: '0% Opetustyö valtiolle (AVL 39§)' },
  { alv: 0, description: '0% Viittomakielen tulkkaus (AVL 59§ 5. mom)' },
  { alv: 0, description: '0% Vakuutuspalvelujen myynti (AVL 44§)' },
  { alv: 0, description: '0% Toisessa EU-maassa sijaitseva yritys/yhdistys, jolla on voimassa oleva VAT-ID tunnus (AVL 44§)' },
  { alv: 0, description: '0% Euroopan unioni (EU dir. 2006/112/EY, 151 art.)' },
  { alv: 0, description: '0% Euroopan unionin ulkopuolinen laskutus (AVL 44§)' },
  { alv: 0, description: '0% Kansainvälinen laivatyö (AVL 71§)' }
]
const titleList = [ 'KONSULTTI', 'OHJELMISTOSUUNNITTELIJA', 'ART DIRECTOR', 'AGRONOMI' ]
const countryList = [ 'Norja', 'Venäjä', 'Viro', 'Saksa', 'Islanti', 'Suomi', 'Ruotsi', 'Tanska' ]
const invoiceList = [ 'Sähköposti', 'Kirjeposti' ]
const invoiceStateList = [ 'Luonnos', 'Lähetetty', 'Maksettu', 'Erääntynyt', 'Alimaksettu', 'Ylimaksettu' ]

const vehicleTypeList = [
  { type: 'default_vehicle_type', fi: 'Valitse' },
  { type: 'own_car', fi: 'Oma auto' },
  { type: 'motor_boat_max_50hp', fi: 'Moottorivene, enintään 50hv' },
  { type: 'motor_boat_over_50hp', fi: 'Moottorivene, yli 50hv' },
  { type: 'snowmobile', fi: 'Moottorikelkka' },
  { type: 'rover', fi: 'Mönkijä' },
  { type: 'motorcycle', fi: 'Moottoripyörä' },
  { type: 'moped', fi: 'Mopo' },
  { type: 'bicycle', fi: 'Polkupyörä' }
]

const additionalVehicleList = [
  { type: 'default_additional_vehicle_cost', fi: 'Valitse' },
  { type: 'trailer', fi: 'Perävaunu' },
  { type: 'caravan', fi: 'Asuntovaunu' },
  { type: 'cabin', fi: 'Taukotupa' }
]

const unitList = ['kpl', 'h']
const alvPercentageList = [
  { alv: 0, description: '0 %'},
  { alv: 10, description: '10 %'},
  { alv: 14, description: '14 %'},
  { alv: 24, description: '24 %'}
]

const _createMenuItems = menuItems =>
  menuItems.map((item, index) => <MenuItem key={index} value={item} primaryText={item}/>)

const _createOverdueItems = () => {
  let overdueItems = []
  for (let i = 0; i < 54; i++) {
    overdueItems.push(<MenuItem key={i + 7} value={i + 7} primaryText={`${i + 7} päivää`}/>)
  }
  return overdueItems
}

export const countryItems = _createMenuItems(countryList)
export const invoiceItems = _createMenuItems(invoiceList)

export const vehicleTypeItems = vehicleTypeList.map((el, index) => <MenuItem key={index}
                                                                     value={el.type}
                                                                     primaryText={el.fi}/>)

export const vehicleAdditionalItems = additionalVehicleList.map((el, index) => <MenuItem key={index}
                                                                                 value={el.type}
                                                                                 primaryText={el.fi} />)

export const alvPercentageItems = alvPercentageList.map((item, index) => <MenuItem key={index}
                                                                                   value={item.alv}
                                                                                   primaryText={item.description}/>)
export const unitItems = _createMenuItems(unitList)
export const overdueItems = _createOverdueItems()
export const titleItems = _createMenuItems(titleList)
export const alvItems = alvList.map((item, index) => <MenuItem key={index}
                                                        value={item.alv}
                                                        primaryText={item.description}/>)

export const invoiceStateListItems = _createMenuItems(invoiceStateList)

export const convertStateToInt = (state) => {
  switch(state) {
    case 'Luonnos': return 0
    case 'Lähetetty': return 1
    case 'Maksettu': return 2
    case 'Erääntynyt': return 3
    case 'Alimaksettu': return 4
    case 'Ylimaksettu': return 5
  }
}

export const convertIntToState = (state) => {
  switch(state) {
    case 0: return 'Luonnos'
    case 1: return 'Lähetetty'
    case 2: return 'Maksettu'
    case 3: return 'Erääntynyt'
    case 4: return 'Alimaksettu'
    case 5: return 'Ylimaksettu'
  }
}

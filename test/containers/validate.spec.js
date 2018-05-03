import { expect } from 'chai'

import * as validates from '../../src/containers/validate'

describe('Validates', () => {
  describe('registerValidate', () => {
    it('should not return any errors', () => {
      const values = {'email': 'email@email.com',
                      'password': 'password',
                      'passwordConfirmation': 'password',
                      'givenName': 'Testi',
                      'familyName': 'Virtanen'}
      expect(validates.registerValidate(values)).to.eql({})
      })

    it('should return errors', () => {
      const values = {}
      const errors = {
        'email': 'Sähköpostikenttä on pakollinen',
        'password': 'Salasanakenttä on pakollinen',
        'passwordConfirmation': 'Salasanan vahvistus on pakollinen',
        'givenName': 'Etunimi on pakollinen',
        'familyName': 'Sukunimi on pakollinen'
      }
      expect(validates.registerValidate(values)).to.eql(errors)
    })

    it('should return invalid email error', () => {
      const values = {'email': 'emailemail.com'}
      const errors = {'email': 'Antamasi sähköpostiosoite  on virheellinen'}
      expect(validates.registerValidate(values).email).to.eql(errors.email)
    })

    it('should return invalid email error 2', () => {
      const values = {'email': 'email@email'}
      const errors = {'email': 'Antamasi sähköpostiosoite  on virheellinen'}
      expect(validates.registerValidate(values).email).to.eql(errors.email)
    })

    it('should notice different passwords', () => {
      const values = {'password': 'password', 'passwordConfirmation': 'passwor'}
      const errors = {'passwordConfirmation': 'Antamasi salasanat eivät täsmää'}
      expect(validates.registerValidate(values).passwordConfirmation).to.eql(errors.passwordConfirmation)
    })
  })


  describe('invoiceValidate', () => {
    const values = {
      rows: {
        0: {
          description0: '',
          start_date: '',
          end_date: '',
          quantity: '',
          unit: '',
          quantity_price: '',
          vat_percent: ''
        }
      }
    }

    it('should return errors', () => {

      const errors = {
        'company_name': 'Kenttä on pakollinen',
        'business_id': 'Kenttä on pakollinen',
        'person_to_contact': 'Kenttä on pakollinen',
        'person_to_contact_email': 'Kenttä on pakollinen',
        'delivery_method': 'Kenttä on pakollinen',
        'zip_code': 'Kenttä on pakollinen',
        'city': 'Kenttä on pakollinen',
        'delivery_address': 'Kenttä on pakollinen',
        'finvoice_address': 'Kenttä on pakollinen',
        'invoice_reference': 'Kenttä on pakollinen',
        'overdue': 'Kenttä on pakollinen',
        'due_date': 'Kenttä on pakollinen',
        'description': 'Kenttä on pakollinen',
        'job_title': 'Kenttä on pakollinen',
        "rows":{
          "0":{
            "description0":"Pakollinen",
            "start_date0":"Pakollinen",
            "end_date0":"Pakollinen",
            "quantity0":"Pakollinen",
            "unit0":"Pakollinen",
            "quantity_price0":"Pakollinen",
            "vat_percent0":"Pakollinen"
          }
        }
      }
      expect(validates.invoiceValidate(values)).to.eql(errors)
    })

    it('should raise zip_code length error', () => {
      values.zip_code = '456'
      const errors = {'zip_code': 'Postinumero ei ole kelvollinen'}
      expect(validates.invoiceValidate(values).zip_code).to.eql(errors.zip_code)
    })

    it('should raise zip code string error', () => {
      values.zip_code = '2fkg9'
      const errors = {'zip_code': 'Postinumero ei ole kelvollinen'}
      expect(validates.invoiceValidate(values).zip_code).to.eql(errors.zip_code)
    })

    it('should raise invoice_reference string error', () => {
      values.invoice_reference = 'abcdef'
      const errors = {'invoice_reference': 'Viitenumero ei ole kelvollinen'}
      expect(validates.invoiceValidate(values).invoice_reference).to.eql(errors.invoice_reference)
    })

    it('should raise email no @ error', () => {
      values.person_to_contact_email = 'emailatemail.com'
      const errors = {'person_to_contact_email': 'Antamasi sähköpostiosoite  on virheellinen'}
      expect(validates.invoiceValidate(values).person_to_contact_email).to.eql(errors.person_to_contact_email)
    })

    it('should raise email wrong form errors', () => {
      values.person_to_contact_email = 'email@emailcomfi'
      const errors = {'person_to_contact_email': 'Antamasi sähköpostiosoite  on virheellinen'}
      expect(validates.invoiceValidate(values).person_to_contact_email).to.eql(errors.person_to_contact_email)
    })

  })

  describe('profileValidate', () => {

    it('should return errors', () => {
      const values = {}
      const errors = {
        'last_name': 'Kenttä on pakollinen',
        'first_name': 'Kenttä on pakollinen',
        'address': 'Kenttä on pakollinen',
        'phone': 'Kenttä on pakollinen',
        'city': 'Kenttä on pakollinen',
        'zip_code': 'Postinumero ei ole kelvollinen',
        'account_number': 'Kenttä on pakollinen'
      }
      expect(validates.profileValidate(values)).to.eql(errors)
    })
    it('should raise zip code error', () => {
      const values = {'zip_code': '456'}
      const errors = {'zip_code': 'Postinumero ei ole kelvollinen'}
      expect(validates.profileValidate(values).zip_code).to.eql(errors.zip_code)

    })
  })

  describe('expenseValidate', () => {

    it('should return errors', () => {
      const values = {
        0: {}
      }
      const errors = {
        'invoice': 'Kenttä on pakollinen',
        'place_of_purchase': 'Kenttä on pakollinen',
        'date_of_purchase': 'Kenttä on pakollinen',
        'receipt_picture': 'Kenttä on pakollinen',
        'expenseInputRow': {
          0: {}
        }
      }
      expect(validates.expenseValidate(values)).to.eql(errors)
    })

  })


  describe('allowanceValidate', () => {

    it('should return errors', () => {
      const values = {}
      const errors = {
        'invoice': 'Kenttä on pakollinen',
        'destination': 'Kenttä on pakollinen',
        'country': 'Kenttä on pakollinen',
        'start_date': 'Kenttä on pakollinen',
        'start_time': 'Kenttä on pakollinen',
        'end_date': 'Kenttä on pakollinen',
        'end_time': 'Kenttä on pakollinen',
        'allowanceInputRow': 'Kenttä on pakollinen'
      }
      expect(validates.allowanceValidate(values)).to.eql(errors)
    })
    it('should return mileage errors', () => {
      const values = {'pay_mileage': true, 'vehicle_type': 'Valitse'}
      const errors = {
        'distance': 'Syöte ei ole kelvollinen',
        'license_plate': 'Kenttä on pakollinen',
        'vehicle_type': 'Kenttä on pakollinen'
      }
      expect(validates.allowanceValidate(values).distance).to.eql(errors.distance)
      expect(validates.allowanceValidate(values).license_plate).to.eql(errors.license_plate)
      expect(validates.allowanceValidate(values).vehicle_type).to.eql(errors.vehicle_type)
    })
  })
})


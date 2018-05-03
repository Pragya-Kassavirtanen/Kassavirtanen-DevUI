import store from '../store'

// Field validators
export const registerValidate = values => {

  const errors = { }
  const requiredFields = [ 'email' ]

  requiredFields.forEach(field => {
    if ( !values[ field ] ) {
      errors[ field ] = 'Sähköpostikenttä on pakollinen'
    }
  })

  if (!values[ 'password' ]) {
    errors.password = 'Salasanakenttä on pakollinen'
  }

  if (values[ 'password' ] !== values[ 'passwordConfirmation' ]) {
    errors.passwordConfirmation = 'Antamasi salasanat eivät täsmää'
  }

  if (!values[ 'passwordConfirmation' ]) {
    errors.passwordConfirmation = 'Salasanan vahvistus on pakollinen'
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Antamasi sähköpostiosoite  on virheellinen'
  }

  if (!values[ 'givenName' ]) {
    errors.givenName = 'Etunimi on pakollinen'
  }

  if (!values[ 'familyName' ]) {
    errors.familyName = 'Sukunimi on pakollinen'
  }

  return errors
}

export const invoiceValidate = values => {

  const errors = { }

  // Customer Info
  const requiredCustomerInfoFields = [
    'company_name', 'business_id', 'person_to_contact', 'person_to_contact_email'
  ]

  // Delivery Info
  const requiredDeliveryMethodFields = [
    'delivery_method', 'zip_code', 'city', 'delivery_address', 'invoice_reference', 'finvoice_address'
  ]

  if(!/^\d{5}$/i.test(values['zip_code']) && values['zip_code']){
    errors['zip_code'] = 'Postinumero ei ole kelvollinen'
  }

  if (!/^\d(.*)$/i.test(values['invoice_reference'] && values['invoice_reference'])) {
    errors['invoice_reference'] = 'Viitenumero ei ole kelvollinen'
  }

  if (values.person_to_contact_email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.person_to_contact_email)) {
    errors['person_to_contact_email'] = 'Antamasi sähköpostiosoite  on virheellinen'
  }

  // Invoice Info
  const requiredInvoiceInfoFields = [
    'overdue', 'due_date', 'description', 'job_title'
  ]

  const requiredFields = [...requiredCustomerInfoFields, ...requiredDeliveryMethodFields, ...requiredInvoiceInfoFields]
  requiredFields.forEach(field => {
    if ( !values[ field ] ) {
      errors[ field ] = 'Kenttä on pakollinen'
    }
  })

  const invoices = (store.getState()).invoice.invoiceInputRows.map(_ => _.key)

  // Invoice rows
  errors['rows'] = {}
  invoices.forEach((item) => {
    errors['rows'][parseInt(item)] = {}
    if (!values['rows'][parseInt(item)][`description${item}`]) {
      errors['rows'][parseInt(item)][`description${item}`] = 'Pakollinen'
    }
    if (!values['rows'][parseInt(item)][`start_date${item}`]) {
      errors['rows'][parseInt(item)][`start_date${item}`] = 'Pakollinen'
    }
    if (!values['rows'][parseInt(item)][`end_date${item}`]) {
      errors['rows'][parseInt(item)][`end_date${item}`] = 'Pakollinen'
    }
    if (!values['rows'][parseInt(item)][`quantity${item}`]) {
      errors['rows'][parseInt(item)][`quantity${item}`] = 'Pakollinen'
    }
    if (!values['rows'][parseInt(item)][`unit${item}`]) {
      errors['rows'][parseInt(item)][`unit${item}`] = 'Pakollinen'
    }
    if (!values['rows'][parseInt(item)][`quantity_price${item}`]) {
      errors['rows'][parseInt(item)][`quantity_price${item}`] = 'Pakollinen'
    }
    if (!values['rows'][parseInt(item)][`vat_percent${item}`]) {
      errors['rows'][parseInt(item)][`vat_percent${item}`] = 'Pakollinen'
    }
  })

  return errors
}

export const customerValidate = values => {

  const errors = { }

  // Customer Info
  const requiredCustomerInfoFields = [
    'company_name', 'business_id', 'person_to_contact', 'person_to_contact_email'
  ]

  // Delivery Info
  const requiredDeliveryMethodFields = [
    'delivery_method'
  ]

  const requiredFields = [...requiredCustomerInfoFields, ...requiredDeliveryMethodFields]
  requiredFields.forEach(field => {
    if ( !values[ field ] ) {
      errors[ field ] = 'Kenttä on pakollinen'
    }
  })

  if(!/^\d{5}$/i.test(values['zip_code'])){
    errors['zip_code'] = 'Postinumero ei ole kelvollinen'
  }

  if (!/^\d(.*)$/i.test(values['invoice_reference'] && values['invoice_reference'])) {
    errors['invoice_reference'] = 'Viitenumero ei ole kelvollinen'
  }

  if (values.person_to_contact_email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.person_to_contact_email)) {
    errors.person_to_contact_email = 'Antamasi sähköpostiosoite  on virheellinen'
  }



  return errors
}

export const profileValidate = values => {
  const errors = {}
  const requiredFields = [ 'last_name', 'first_name', 'address', 'phone', 'city', 'account_number' ]

  requiredFields.forEach(field => {
    if ( !values [ field ] ) {
      errors[ field ] = 'Kenttä on pakollinen'
    }
  })
  if (!/^\d{5}$/i.test(values['zip_code']) || !values['zip_code']) {
    errors['zip_code'] = 'Postinumero ei ole kelvollinen'
  }

  return errors
}

export const expenseValidate = values => {
  const errors = {}
  const requiredFields = [ 'invoice', 'place_of_purchase', 'date_of_purchase', 'receipt_picture' ]

  requiredFields.forEach(field => {
    if ( !values [ field ] ) {
      errors[ field ] = 'Kenttä on pakollinen'
    }
  })

  const expenses = (store.getState()).expense.expenseInputRow.map(_ => _.key)

  errors['expenseInputRow'] = {}

  expenses.forEach((item) => {
    errors['expenseInputRow'][item] = {}
    if(values['expenseInputRow'] && errors['expenseInputRow'][item]) {
      if (!values['expenseInputRow'][item][`description${item}`]) {
        errors['expenseInputRow'][item][`description${item}`] = 'Pakollinen kenttä'
      }
      if (!/^[0-9]*$/i.test(values['expenseInputRow'][item][`sum${item}`])) {
        errors['expenseInputRow'][item][`sum${item}`] = 'Summa ei ole kelvollinen'
      }
      if (!values['expenseInputRow'][item][`sum${item}`]) {
        errors['expenseInputRow'][item][`sum${item}`] = 'Pakollinen kenttä'
      }


      if (!values['expenseInputRow'][item][`vat${item}`]) {
        errors['expenseInputRow'][item][`vat${item}`] = 'Pakollinen kenttä'
      }
    }
  })
  console.log(errors)

  return errors
}

export const allowanceValidate = values => {
  const errors = {}
  const requiredFields = [ 'invoice', 'destination', 'country', 'start_date', 'start_time', 'end_date', 'end_time', 'allowanceInputRow']
  requiredFields.forEach(field => {
    if ( !values [ field ] ) {
      errors[ field ] = 'Kenttä on pakollinen'
    }
  })

  if(values.pay_mileage) {
    const requiredMileageFields = [ 'distance', 'license_plate', 'vehicle_type' ]

    if (!values[requiredMileageFields[0]] || !/^\d+$/.test(values[requiredMileageFields[0]])) {
      errors[requiredMileageFields[0]] = 'Syöte ei ole kelvollinen'
    }

    if (values[requiredMileageFields[2]] !== 'Polkupyörä' && !values[requiredMileageFields[1]]) {
      errors[requiredMileageFields[1]] = 'Kenttä on pakollinen'
    }

    if ( values[requiredMileageFields[2]] === 'Valitse' ) {
      errors[requiredMileageFields[2]] = 'Kenttä on pakollinen'
    }
  }

  const routeArrayErrors = []
  if(values.allowanceInputRow) for (let index in values.allowanceInputRow) {
    const routeErrors = {}
    if(!values.allowanceInputRow[index].route) routeErrors.route = 'Kenttä on pakollinen'
    routeArrayErrors[index] = routeErrors
  }
  (routeArrayErrors.filter(_ => !!_.route).length !== 0) && (errors.allowanceInputRow = routeArrayErrors)

  return errors
}

export const yelValidate = values => {

  const errors = { }
  const requiredFields = [ 'income', 'ageGroup' ]

  requiredFields.forEach(field => {
    if ( !values[ field ] ) {
      errors[ field ] = 'Kenttä on pakollinen'
    }
  })

  if (!/^[0-9]*$/i.test(values['income'] && values['income'])) {
    errors['income'] = 'Syöte ei ole kelvollinen'
  }

  if (values['income'] < 7645 && values['income']) {
    errors['income'] = 'YEL-vakuutusta ei tarvitse maksaa alle 7645 euron tuloista'
  }

  if(values['income'] > 173625 && values['income']) {
    errors['income'] = 'YEL-vakuutusta ei tarvitse maksaa yli 173625 euron tuloista'
  }

  return errors
}

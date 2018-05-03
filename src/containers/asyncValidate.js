
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const registerAsyncValidate = (values/*, dispatch */) => {

  return sleep(250) // simulate server latency
    .then(() => {
      if ([ 'foo@foo.com', 'bar@bar.com' ].includes(values.email)) {
        throw { email: 'Email already Exists' }
      }
    })
}

export const invoiceAsyncValidate = values => {

  return sleep(250)
    .then( () => {
      if ([ 'testiosoite' ].includes(values.address)) {
        throw { address: 'Address already exists' }
      }
    })
}

export const profileAsyncValidate = values => {
  return sleep(250)
    .then( () => {
      if ([ 'testiosoite' ].includes(values.address)) {
        throw { address: 'Address already exists' }
      }
    })
}

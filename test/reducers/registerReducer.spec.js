import registerForm from '../../src/reducers/register.reducer'
import { SIGNUP_FORM_SUBMIT } from '../../src/constants'

describe('λ Sign-up Reducer', () => {
  it('handles SIGNUP FORM SUBMIT', () => {

    const initialState = { }
    const action = {
      type: SIGNUP_FORM_SUBMIT,
      showSpinner: true
    }

    const newState = registerForm(initialState, action)

    expect(newState).to.eql({
      showSpinner: true
    })
  })

  it('handles Default', () => {

    const initialState = { }
    const action = {
      type: 'I_AM_LOST',
      givenName: 'Judged',
      familyName: 'Dredd',
      email: 'judged.dredd@event-horizon.glx',
      password: 'rdx'
    }

    const newState = registerForm(initialState, action)

    expect(newState).to.eql({ })
  })
})

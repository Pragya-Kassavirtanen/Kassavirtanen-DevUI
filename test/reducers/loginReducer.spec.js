import loginForm from '../../src/reducers/login.reducer'
import { LOGIN_FORM_SUBMIT } from '../../src/constants'


describe('λ Login Reducer', () => {

  it('handles LOGIN FORM SUBMIT', () => {

    const initialState = { }
    const action = { type: LOGIN_FORM_SUBMIT, username: 'tester', password: 'pass' }
    const newState = loginForm(initialState, action)

    expect(newState).to.eql({ username: 'tester', password: 'pass' })
  })

  it('handles Default', () => {

    const initialState = { username: 'my', password: 'space' }
    const action = { type: 'LOST_IN_ACTION', username: 'action', password: 'lost'}
    const newState = loginForm(initialState, action)

    expect(newState).to.eql({ username: 'my', password: 'space' })
  })
})


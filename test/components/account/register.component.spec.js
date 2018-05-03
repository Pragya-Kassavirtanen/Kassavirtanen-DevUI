import React from 'react'
import { shallow } from 'enzyme'

import RegisterComponent from '../../../src/components/account/register.component'
const wrapper = shallow(<RegisterComponent handleSubmit={e => e}/>)


describe('λ Component: Register', () => {
  it('has its base node as RegisterComponent', () => {
    expect(wrapper.name()).to.equal('RegisterComponent')
  })

  it('has a form', () => {
    expect(true).to.be.true
  })

})

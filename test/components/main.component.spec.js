/**
 * @author  Skylar Kong <skylar.kong@absum.net>
 *
 */

'use strict'

import React from 'react'
import { shallow, mount } from 'enzyme'
import Main from '../../src/components/main.component'
import Account from '../../src/components/account/account.component'

describe('λ MainComponent', () => {

  it('has its base node as section', () => {
    const wrapper = shallow(<Main/>)

    expect(wrapper.name()).to.equal('div')
  })

  it('renders Account component, if a user is present', () => {
    const wrapper = shallow(<Main user={{username: 'tester'}}/>)

    expect(wrapper.contains(<Account/>)).to.equal(false)
  })
  it('doesn\'t render Account, if a user is not present', () => {
    const wrapper = shallow(<Main/>)

    expect(wrapper.contains(<Account/>)).to.equal(true)
  })
})

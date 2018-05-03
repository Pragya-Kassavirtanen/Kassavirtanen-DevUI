/**
 * @author Skylar Kong <skylar.kong@absum.net>
 */

'use strict'

import React from 'react'
import { shallow, mount } from 'enzyme'
import Account from 'components/account/account.component'

describe('λ Component: Account', () => {
  it('has its base node as div', () => {
    const wrapper = shallow(<Account/>)
    expect(wrapper.name()).to.equal('div')
  })

})


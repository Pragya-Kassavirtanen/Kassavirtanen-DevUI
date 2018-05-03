import React from 'react'
import { SubmissionError } from 'redux-form'

import { shallowWithStore } from 'enzyme-redux'
import { createMockStore } from 'redux-test-utils'

import chai, { expect } from 'chai'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'

import RegisterComponent, { renderTextField } from '../../src/components/account/register.component'
import RegisterContainer from '../../src/containers/register.container'

describe('λ Register shallowWithStore', () => {

  describe('state', () => {

    it('• works', () => {

      const expectedState = 'expectedState'
      const mapStateToProps = state => ({
        state
      })

      // TODO: Test something

      // It corresponds to the container class
      // const component = shallowWithStore(<RegisterComponent/>, createMockStore(expectedState))

      // expect(component.props().state).to.be(expectedState)
    })
  })
})




// describe('example shallowWithStore', () => {
//
//   // It corresponds to view class
//   const ReactComponent = () => (<div>testi komponentti</div>);
//
//   describe('state', () => {
//
//     it('works', () => {
//
//       const expectedState = 'expectedState';
//
//       const mapStateToProps = (state) => ({
//         state
//       });
//
//       // It corresponds to container class
//       const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
//
//       const component = shallowWithStore(<ConnectedComponent />, createMockStore(expectedState));
//
//       expect(component.props().state).to.equal(expectedState);
//     });
//
//   });
//
//   describe('dispatch', () => {
//     it('works', () => {
//       const action = {
//         type: 'test',
//       };
//       const mapDispatchToProps = (dispatch) => ({
//         dispatchProp() {
//           dispatch(action);
//         }
//       });
//       const store = createMockStore();
//
//       const ConnectedComponent = connect(undefined, mapDispatchToProps)(ReactComponent);
//       const component = shallowWithStore(<ConnectedComponent />, store);
//       component.props().dispatchProp();
//       expect(store.isActionDispatched(action)).to.be(true);
//     });
//
//   });
//
// });

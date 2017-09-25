import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { AddWidgetModal, mapStateToProps, mapDispatchToProps } from '../components/ModalAddWidget/';

const state = {
  widgets: {
    showAddWidgetModal: true,
    ids: ['1'],
  },
};

/* eslint-disable react/jsx-boolean-value */
describe('AddWidgetModal component', () => {
  it('should render a component with props as specified ', () => {
    const addWidget = jest.fn();
    const hideAddWidgetModal = jest.fn();
    const component = shallow(
      <AddWidgetModal
        addWidget={addWidget}
        hideAddWidgetModal={hideAddWidgetModal}
        ids={['1']}
        showAddWidgetModal={true}
        metadata={{ 1: 'slack' }}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('maps given state to props ', () => {
    const expected = {
      showAddWidgetModal: true,
      ids: ['1'],
    };
    expect(mapStateToProps(state)).toEqual(expected);
  });

  it('maps component dispatches to props ', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).toHaveProperty('addWidget');
    expect(mapDispatchToProps(dispatch)).toHaveProperty('hideAddWidgetModal');
  });
});

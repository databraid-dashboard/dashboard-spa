import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
/* eslint-disable import/extensions */
import { AppComponent, mapStateToProps, mapDispatchToProps } from '../App.jsx';

const state = {
  widgets: {
    ids: ['github'],
    showSidebar: true,
    grid: {
      layout: [{ i: 'slack', x: 0, y: 8, w: 6, h: 8, static: true }],
    },
  },
};
/* eslint-disable react/jsx-boolean-value */
describe('App component', () => {
  it('should render the App component with props as specified ', () => {
    const showAddWidgetModal = jest.fn();
    const showDashboardSidebar = jest.fn();
    const hideDashboardSidebar = jest.fn();
    const component = shallow(
      <AppComponent
        showAddWidgetModal={showAddWidgetModal}
        showDashboardSidebar={showDashboardSidebar}
        hideDashboardSidebar={hideDashboardSidebar}
        ids={['github']}
        showSidebar={true}
        layout={[{ i: 'slack', x: 0, y: 8, w: 6, h: 8, static: true }]}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('maps given state to props ', () => {
    const expected = {
      ids: ['github'],
      showSidebar: true,
      layout: [{ i: 'slack', x: 0, y: 8, w: 6, h: 8, static: true }],
    };
    expect(mapStateToProps(state)).toEqual(expected);
  });

  it('maps component dispatches to props ', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).toHaveProperty('showAddWidgetModal');
    expect(mapDispatchToProps(dispatch)).toHaveProperty('showDashboardSidebar');
    expect(mapDispatchToProps(dispatch)).toHaveProperty('hideDashboardSidebar');
  });

  it('Should have className page-container', () => {
    const showAddWidgetModal = jest.fn();
    const showDashboardSidebar = jest.fn();
    const hideDashboardSidebar = jest.fn();
    const component = shallow(
      <AppComponent
        showAddWidgetModal={showAddWidgetModal}
        showDashboardSidebar={showDashboardSidebar}
        hideDashboardSidebar={hideDashboardSidebar}
        ids={['github']}
        showSidebar={true}
        layout={[{ i: 'slack', x: 0, y: 8, w: 6, h: 8, static: true }]}
      />,
    );
    expect(component.find('.page-container').exists()).toBe(true);
  });
});

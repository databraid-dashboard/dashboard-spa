
// import nock from 'nock';
import * as TYPES from '../constants/index';
import * as actions from './index';

describe('actions', () => {
  it('should create an action to add a transit widget', () => {
    const expectedAction = {
      type: TYPES.ADD_WIDGET,
      id: TYPES.TRANSIT_WIDGET_ID,
    };

    expect(actions.addWidget(TYPES.TRANSIT_WIDGET_ID)).toEqual(expectedAction);
  });
  it('should create an action to add a slack widget', () => {
    const expectedAction = {
      type: TYPES.ADD_WIDGET,
      id: TYPES.SLACK_WIDGET_ID,
    };

    expect(actions.addWidget(TYPES.SLACK_WIDGET_ID)).toEqual(expectedAction);
  });
  it('should create an action to add a github widget', () => {
    const expectedAction = {
      type: TYPES.ADD_WIDGET,
      id: TYPES.GITHUB_WIDGET_ID,
    };

    expect(actions.addWidget(TYPES.GITHUB_WIDGET_ID)).toEqual(expectedAction);
  });
  it('should create an action to show widget modal', () => {
    const expectedAction = {
      type: TYPES.SHOW_ADD_WIDGET_MODAL,
    };

    expect(actions.showAddWidgetModal()).toEqual(expectedAction);
  });
  it('should create an action to hide widget modal', () => {
    const expectedAction = {
      type: TYPES.HIDE_ADD_WIDGET_MODAL,
    };

    expect(actions.hideAddWidgetModal()).toEqual(expectedAction);
  });
  it('should create an action to show dashboard sidebar', () => {
    const expectedAction = {
      type: TYPES.SHOW_DASHBOARD_SIDEBAR,
    };

    expect(actions.showDashboardSidebar()).toEqual(expectedAction);
  });
  it('should create an action to hide dashboard sidebar', () => {
    const expectedAction = {
      type: TYPES.HIDE_DASHBOARD_SIDEBAR,
    };

    expect(actions.hideDashboardSidebar()).toEqual(expectedAction);
  });
});

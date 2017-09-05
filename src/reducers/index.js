import { combineReducers } from 'redux';
import { rootReducer as transitReducer } from '@databraid/transit-widget/lib';
import { rootReducer as githubReducer } from '@databraid/github-widget/lib';
import { rootReducer as slackReducer } from '@databraid/slack-widget/lib';
// remove eslint exception when slack widget is implemented
/* eslint-disable no-unused-vars  */
import {
  TRANSIT_WIDGET_ID,
  SLACK_WIDGET_ID,
  GITHUB_WIDGET_ID,
  ADD_WIDGET,
  SHOW_ADD_WIDGET_MODAL,
  HIDE_ADD_WIDGET_MODAL,
  SHOW_DASHBOARD_SIDEBAR,
  HIDE_DASHBOARD_SIDEBAR,
} from '../constants';

const initialState = {
  ids: [TRANSIT_WIDGET_ID, GITHUB_WIDGET_ID, SLACK_WIDGET_ID],
  byId: {},
  showSidebar: false,
  showAddWidgetModal: false,
  grid: {
    nextId: 1,
    layout: [],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  },
};

const widgets = (state = initialState, action) => ({
  ...state,
  byId: {
    [TRANSIT_WIDGET_ID]: transitReducer(state.byId[TRANSIT_WIDGET_ID], action),
    [GITHUB_WIDGET_ID]: githubReducer(state.byId[GITHUB_WIDGET_ID], action),
    [SLACK_WIDGET_ID]: slackReducer(state.byId[SLACK_WIDGET_ID], action),
  },
});

export default combineReducers({
  widgets,
});

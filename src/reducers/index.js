import { combineReducers } from 'redux';
import { rootReducer as transitReducer } from '@databraid/transit-widget/lib';
import { rootReducer as githubReducer } from '@databraid/github-widget/lib';
import { rootReducer as slackReducer } from '@databraid/slack-widget/lib';
// remove eslint exception when slack widget is implemented
/* eslint-disable no-unused-vars  */
import { TRANSIT_WIDGET_ID, SLACK_WIDGET_ID, GITHUB_WIDGET_ID } from '../constants';

const initialState = {
  ids: [TRANSIT_WIDGET_ID, GITHUB_WIDGET_ID, SLACK_WIDGET_ID],
  byId: {},
};

const widgets = (state = initialState, action) => ({
  ...state,
  byId: {
    [TRANSIT_WIDGET_ID]: transitReducer(state.byId[TRANSIT_WIDGET_ID], action),
    [GITHUB_WIDGET_ID]: githubReducer(state.byId[GITHUB_WIDGET_ID], action),
    [SLACK_WIDGET_ID]: slackReducer(state.byId[SLACK_WIDGET_ID], action),
  },
});

const rootReducer = combineReducers({
  widgets,
});

export default rootReducer;

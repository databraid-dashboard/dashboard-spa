import { transit as transitReducer } from '@databraid/transit-widget/lib/reducers';
import { github as githubReducer } from '@databraid/github-widget/lib/reducers';
import { storeReducer as slackReducer } from '@databraid/slack-widget/lib/Reducers';
import { sheets as sheetsReducer } from '@databraid/sheets-widget/lib/reducers';

export default [
  {
    type: 'transit',
    icon: 'rocket',
    initHeight: 8,
    initWidth: 6,
    minHeight: 4,
    minWidth: 3,
    widgetReducer: transitReducer,
  },
  {
    type: 'github',
    icon: 'github',
    initHeight: 8,
    initWidth: 6,
    minHeight: 4,
    minWidth: 3,
    widgetReducer: githubReducer,
  },
  {
    type: 'slack',
    icon: 'slack',
    initHeight: 6,
    initWidth: 4,
    minHeight: 4,
    minWidth: 3,
    widgetReducer: slackReducer,
  },
  {
    type: 'sheets',
    icon: 'table',
    initHeight: 8,
    initWidth: 8,
    minHeight: 4,
    minWidth: 3,
    widgetReducer: sheetsReducer,
  },
];

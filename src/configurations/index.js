import { transit as transitReducer } from '@databraid/transit-widget/lib/reducers';
import transitComponent from '@databraid/transit-widget/lib/App';
import { github as githubReducer } from '@databraid/github-widget/lib/reducers';
import githubComponent from '@databraid/github-widget/lib/App';
import { storeReducer as slackReducer } from '@databraid/slack-widget/lib/Reducers';
import slackComponent from '@databraid/slack-widget/lib/App';
import { sheets as sheetsReducer } from '@databraid/sheets-widget/lib/reducers';
import sheetsComponent from '@databraid/sheets-widget/lib/App';


export default {
  transit: {
    type: 'transit',
    displayName: 'Transit',
    icon: 'rocket',
    initHeight: 12,
    initWidth: 6,
    minHeight: 4,
    minWidth: 4,
    widgetReducer: transitReducer,
    widgetComponent: transitComponent,
  },
  github: {
    type: 'github',
    displayName: 'GitHub',
    icon: 'github',
    initHeight: 8,
    initWidth: 6,
    minHeight: 4,
    minWidth: 3,
    widgetReducer: githubReducer,
    widgetComponent: githubComponent,
  },
  slack: {
    type: 'slack',
    displayName: 'Slack',
    icon: 'slack',
    initHeight: 9,
    initWidth: 4,
    minHeight: 4,
    minWidth: 3,
    widgetReducer: slackReducer,
    widgetComponent: slackComponent,
  },
  sheets: {
    type: 'sheets',
    displayName: 'Sheets',
    icon: 'table',
    initHeight: 8,
    initWidth: 8,
    minHeight: 4,
    minWidth: 3,
    widgetReducer: sheetsReducer,
    widgetComponent: sheetsComponent,
  },
};

import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import TransitComponent from '@databraid/transit-widget/lib';
import SlackComponent from '@databraid/slack-widget/lib/App';
import GithubComponent from '@databraid/github-widget/lib';
import { TRANSIT_WIDGET_ID, SLACK_WIDGET_ID, GITHUB_WIDGET_ID } from './constants';
import './App.css';
// import { Root as ExapleComponent } from  '@databraid/example-widget/lib';
const Grid = ReactGridLayout.WidthProvider(ReactGridLayout);

const App = () => {
  // layout is an array of objects, see the demo for more complete usage
  const layout = [
    {
      i: 'a',
      x: 6,
      y: 0,
      w: 12,
      h: 10,
      minH: 6.5,
      minW: 7,
    },
    { i: 'b', x: 3, y: 0, w: 6, h: 12 },
    { i: 'c', x: 0, y: 0, w: 6, h: 10 },
  ];
  return (
    <Grid verticalCompact={false} autclassName="layout" layout={layout} cols={12} rowHeight={30}>
      <div className="transit" key={'a'}>
        <TransitComponent widgetId={TRANSIT_WIDGET_ID} />
      </div>

      <div key={'b'}>
        <GithubComponent widgetId={GITHUB_WIDGET_ID} />
      </div>

      <div key={'c'}>
        <SlackComponent widgetId={SLACK_WIDGET_ID} />
      </div>
    </Grid>
  );
};

export default App;

import { combineReducers } from 'redux';
import { transit as transitReducer } from '@databraid/transit-widget/lib/reducers';
import { github as githubReducer } from '@databraid/github-widget/lib/reducers';
import { storeReducer as slackReducer } from '@databraid/slack-widget/lib/Reducers';
import { REHYDRATE } from 'redux-persist/constants';

import {
  TRANSIT_WIDGET_ID,
  SLACK_WIDGET_ID,
  GITHUB_WIDGET_ID,
  TRANSIT_WIDGET,
  SLACK_WIDGET,
  GITHUB_WIDGET,
  ADD_WIDGET,
  REMOVE_WIDGET,
  SHOW_ADD_WIDGET_MODAL,
  HIDE_ADD_WIDGET_MODAL,
  SHOW_DASHBOARD_SIDEBAR,
  HIDE_DASHBOARD_SIDEBAR,
  SHOW_WIDGET_SIDEBAR,
  HIDE_WIDGET_SIDEBAR,
  LOCK_DASHBOARD,
  UNLOCK_DASHBOARD,
  SAVE_LAYOUT_CHANGE,
} from '../constants';

const initialState = {
  ids: [],
  byId: {},
  showSidebar: false,
  showAddWidgetModal: false,
  locked: false,
  grid: {
    nextId: 1,
    layout: [],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  },
  metadata: {},
};

export const collapseWidgetSidebars = (metadata) => {
  const newMetadata = { ...metadata };
  Object.keys(newMetadata).forEach((widgetId) => {
    newMetadata[widgetId] = {
      ...metadata[widgetId],
      showSidebar: false,
    };
  });
  return newMetadata;
};


const isYOverlap = (newY, newW, widgetY, widgetW) => {
  const y1 = (
    widgetY >= newY &&
    widgetY <= (newY + newW) - 1
  );
  const y2 = (
    (widgetY + widgetW) - 1 >= newY &&
    (widgetY + widgetW) - 1 <= (newY + newW) - 1
  );
  const y3 = (
    newY >= widgetY &&
    newY <= (widgetY + widgetW) - 1
  );
  const y4 = (
    (newY + newW) - 1 >= widgetY &&
    (newY + newW) - 1 <= (widgetY + widgetW) - 1
  );

  return y1 || y2 || y3 || y4;
};

export const isValidLocation = (layout, x, y, w, h) => {
  for (let i = 0; i < layout.length; i += 1) {
    const x1 = (
      layout[i].x >= x &&
      layout[i].x <= (x + h) - 1 &&
      isYOverlap(y, w, layout[i].y, layout[i].w)
    );
    const x2 = (
      (layout[i].x + layout[i].h) - 1 >= x &&
      (layout[i].x + layout[i].h) - 1 <= (x + h) - 1 &&
      isYOverlap(y, w, layout[i].y, layout[i].w)
    );
    const x3 = (
      x >= layout[i].x &&
      x <= (layout[i].x + layout[i].h) - 1 &&
      isYOverlap(y, w, layout[i].y, layout[i].w)
    );
    const x4 = (
      (x + h) - 1 >= layout[i].x &&
      (x + h) - 1 <= (layout[i].x + layout[i].h) - 1 &&
      isYOverlap(y, w, layout[i].y, layout[i].w)
    );

    if (x1 || x2 || x3 || x4) {
      return false;
    }
  }
  return true;
};


export const calculateInitialPosition = (layout, width, height, maxCols = 12) => {
  if (width > maxCols) {
    return null;
  }
  for (let x = 0; x < 1000; x += 1) { // hardcoded upper limit to avoid unlikely infinite loop
    for (let y = 0; y <= maxCols - width; y += 1) {
      if (isValidLocation(layout, x, y, width, height, maxCols)) {
        return { x, y };
      }
    }
  }
  return null;
};


export const widgets = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WIDGET: {
      const newLoc = calculateInitialPosition(state.grid.layout, 6, 8);
      if (action.id === TRANSIT_WIDGET_ID && !state.ids.includes(TRANSIT_WIDGET_ID)) {
        return {
          ...state,
          ids: [...state.ids, TRANSIT_WIDGET_ID],
          showAddWidgetModal: false,
          grid: {
            ...state.grid,
            layout: [
              ...state.grid.layout,
              { i: TRANSIT_WIDGET_ID, x: newLoc.x, y: newLoc.y, w: 6, h: 8, static: false },
            ],
          },
          metadata: {
            ...state.metadata,
            [action.id]: {
              type: TRANSIT_WIDGET,
              standardWidth: 6,
              standardHeight: 8,
              minWidth: 4,
              minHeight: 4,
              showSidebar: false,
            },
          },
        };
      } else if (action.id === GITHUB_WIDGET_ID && !state.ids.includes(GITHUB_WIDGET_ID)) {
        return {
          ...state,
          ids: [...state.ids, GITHUB_WIDGET_ID],
          showAddWidgetModal: false,
          grid: {
            ...state.grid,
            layout: [
              ...state.grid.layout,
              { i: GITHUB_WIDGET_ID, x: newLoc.x, y: newLoc.y, w: 6, h: 8, static: false },
            ],
          },
          metadata: {
            ...state.metadata,
            [action.id]: {
              type: GITHUB_WIDGET,
              standardWidth: 6,
              standardHeight: 8,
              minWidth: 4,
              minHeight: 4,
              showSidebar: false,
            },
          },
        };
      } else if (action.id === SLACK_WIDGET_ID && !state.ids.includes(SLACK_WIDGET_ID)) {
        return {
          ...state,
          ids: [...state.ids, SLACK_WIDGET_ID],
          showAddWidgetModal: false,
          grid: {
            ...state.grid,
            layout: [
              ...state.grid.layout,
              { i: SLACK_WIDGET_ID, x: newLoc.x, y: newLoc.y, w: 6, h: 8, static: false },
            ],
          },
          metadata: {
            ...state.metadata,
            [action.id]: {
              type: SLACK_WIDGET,
              standardWidth: 6,
              standardHeight: 6,
              minWidth: 4,
              minHeight: 4,
              showSidebar: false,
            },
          },
        };
      }
      return {
        ...state,
        showAddWidgetModal: false,
      };
    }

    case REMOVE_WIDGET: {
      const newIds = [...state.ids];
      const removeIndex = newIds.indexOf(action.id);

      if (removeIndex > -1) {
        newIds.splice(removeIndex, 1);
      }

      return {
        ...state,
        ids: newIds,
      };
    }

    case SHOW_ADD_WIDGET_MODAL:
      return {
        ...state,
        showAddWidgetModal: true,
        showSidebar: false,
      };

    case HIDE_ADD_WIDGET_MODAL:
      return {
        ...state,
        showAddWidgetModal: false,
      };

    case SHOW_DASHBOARD_SIDEBAR:
      return {
        ...state,
        showSidebar: true,
        metadata: collapseWidgetSidebars(state.metadata),
      };

    case HIDE_DASHBOARD_SIDEBAR:
      return {
        ...state,
        showSidebar: false,
      };

    case REHYDRATE:
      /* You can also only pass in what you want to persist in the store by
      accessing the path you want to persist from the action.payload. */
      return {
        ...state,
        ...action.payload.widgets,
      };

    case SHOW_WIDGET_SIDEBAR:
      return {
        ...state,
        metadata: {
          ...collapseWidgetSidebars(state.metadata),
          [action.id]: {
            ...state.metadata[action.id],
            showSidebar: true,
          },
        },
        showSidebar: false,
      };

    case HIDE_WIDGET_SIDEBAR:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          [action.id]: {
            ...state.metadata[action.id],
            showSidebar: false,
          },
        },
      };

    case LOCK_DASHBOARD:
      return {
        ...state,
        showSidebar: false,
        locked: true,
        grid: {
          ...state.grid,
          layout: state.grid.layout.map(layoutObj => (
            {
              ...layoutObj,
              static: true,
            }
          )),
        },
      };

    case UNLOCK_DASHBOARD:
      return {
        ...state,
        showSidebar: false,
        locked: false,
        grid: {
          ...state.grid,
          layout: state.grid.layout.map(layoutObj => (
            {
              ...layoutObj,
              static: false,
            }
          )),
        },
      };

    case SAVE_LAYOUT_CHANGE:
      return {
        ...state,
        grid: {
          ...state.grid,
          layout: action.layout,
        },
      };

    default:
      return {
        ...state,
        byId: {
          [TRANSIT_WIDGET_ID]: transitReducer(state.byId[TRANSIT_WIDGET_ID], action),
          [GITHUB_WIDGET_ID]: githubReducer(state.byId[GITHUB_WIDGET_ID], action),
          [SLACK_WIDGET_ID]: slackReducer(state.byId[SLACK_WIDGET_ID], action),
        },
        showSidebar: state.ids.length === 0,
      };
  }
};

const rootReducer = combineReducers({
  widgets,
});

export default rootReducer;

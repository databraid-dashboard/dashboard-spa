import {
  ADD_WIDGET,
  SHOW_ADD_WIDGET_MODAL,
  HIDE_ADD_WIDGET_MODAL,
  SHOW_DASHBOARD_SIDEBAR,
  HIDE_DASHBOARD_SIDEBAR,
} from '../constants';

export function addWidget(widgetType) {
  return { type: ADD_WIDGET, id: widgetType };
}

export function showAddWidgetModal() {
  return { type: SHOW_ADD_WIDGET_MODAL };
}

export function hideAddWidgetModal() {
  return { type: HIDE_ADD_WIDGET_MODAL };
}

export function showDashboardSidebar() {
  return { type: SHOW_DASHBOARD_SIDEBAR };
}

export function hideDashboardSidebar() {
  return { type: HIDE_DASHBOARD_SIDEBAR };
}

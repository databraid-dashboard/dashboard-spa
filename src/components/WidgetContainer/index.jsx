import React from 'react';
import {
  Icon,
  Sidebar,
  Segment,
  Menu,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  removeWidget,
  showWidgetSidebar,
  hideWidgetSidebar,
} from '../../actions';
import WidgetSidestrip from '../WidgetSidestrip/';
import widgetConfigs from '../../configurations/';

const WidgetContainer = (props) => {
  const WidgetComponent = widgetConfigs[props.type].widgetComponent;
  let component = <WidgetComponent widgetId={props.id} />;

  return (
    <div className="widget">
      {props.locked ? null : <WidgetSidestrip id={props.id} />}

      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          width="thin"
          direction="right"
          visible={props.showSidebar}
          icon="labeled"
          vertical
          inverted
        >
          <Menu.Item name="delete-widget" onClick={() => props.removeWidget(props.id)}>
            <Icon name="remove" />
            Delete
          </Menu.Item>
          <Menu.Item name="settings" disabled>
            <Icon name="tasks" />
            Configs
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic>
            {component}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

WidgetContainer.propTypes = {
  id: PropTypes.string.isRequired,
  showSidebar: PropTypes.bool.isRequired,
  locked: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  removeWidget: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id;
  const showSidebar = state.widgets.metadata[ownProps.id].showSidebar;
  const locked = state.widgets.locked;
  const type = state.widgets.metadata[ownProps.id].type;
  return { id, showSidebar, locked, type };
};

export const mapDispatchToProps = dispatch => bindActionCreators({
  removeWidget,
  showWidgetSidebar,
  hideWidgetSidebar,
},
dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WidgetContainer);

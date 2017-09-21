import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addWidget,
  hideAddWidgetModal,
} from '../../actions';
import widgetConfigs from '../../configurations';
/* eslint-disable react/no-unused-prop-types */
export const AddWidgetModal = props => (
  <Modal basic size="small" open={props.showAddWidgetModal}>
    <Header icon="new pied piper" content="Choose a widget" />
    <Modal.Content>
      <p>You may only display one of each widget at this time.</p>
    </Modal.Content>
    <Modal.Actions>
      {
        widgetConfigs.map(cfg => (
          <Button
            basic
            color="blue"
            onClick={() => props.addWidget(cfg.type)}
            inverted
            disabled={props.ids.includes(cfg.type)}
            key={cfg.type}
          >
            <Icon name={cfg.icon} size="large" />{cfg.type}
          </Button>
        ),
        )
      }
      <Button
        basic
        color="red"
        onClick={props.hideAddWidgetModal}
        inverted
      >
        <Icon name="cancel" size="large" /> Cancel
      </Button>
    </Modal.Actions>
  </Modal>
);

AddWidgetModal.propTypes = {
  showAddWidgetModal: PropTypes.bool.isRequired,
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  addWidget: PropTypes.func.isRequired,
  hideAddWidgetModal: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
  const showAddWidgetModal = state.widgets.showAddWidgetModal;
  const ids = state.widgets.ids;
  return { showAddWidgetModal, ids };
};

export const mapDispatchToProps = dispatch => bindActionCreators({
  addWidget,
  hideAddWidgetModal,
},
dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddWidgetModal);

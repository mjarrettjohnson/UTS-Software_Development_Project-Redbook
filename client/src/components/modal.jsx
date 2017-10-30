import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Search from '../components/search';
import '../styles/search.css';

export default class ModalBox extends Component {
  static propTypes = {
    btnTitle: PropTypes.string,
    icon: PropTypes.string,
    body: PropTypes.object,
    tooltip: PropTypes.string,
    action: PropTypes.func,
  };

  modalStyles = {
    content: {
      top: '15%',
      left: '25%',
      right: '25%',
      bottom: '25%',
      padding: '40px',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  submit(query) {
    this.props.action(query);
    this.closeModal();
  }

  render() {
    return (
      <li>
        <a onClick={this.openModal.bind(this)}>
          Search By Date
          <span style={{ fontSize: '16px' }} className="pull-right hidden-xs showopacity glyphicon glyphicon-search" />
        </a>

        <Modal
          className="Modal"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          contentLabel="Modal"
        >
          <button onClick={this.closeModal.bind(this)} className="btn-close-modal">
            <i className="glyphicon glyphicon-remove" />
          </button>

          <div className="row">
            <div className="col-md-12">
              <Search action={this.submit.bind(this)} />
            </div>
          </div>
        </Modal>
      </li>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {toggleShelf} from '../../actions';

import './Shelf.css';

class Shelf extends Component {
  constructor(props) {
    super(props);

    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  render() {
    let className = 'lb-c-shelf';
    if (this.props.open) {
      className += ' lb-c-shelf--is-open';
    }

    return (
      <div className={className}>
        <div className="lb-c-shelf__control-bar">
          <button onClick={this.handleCloseClick} className="lb-c-shelf__tab lb-c-shelf__tab--is-active">About</button>
          <button onClick={this.handleCloseClick} className="lb-c-shelf__tab lb-c-shelf__tab--close">×</button>
        </div>
        <div className="lb-c-shelf__content-wraper">
          <div className="lb-c-shelf__content">
            <h1>Mattis Amet Bibendum</h1>
            <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
            </p>
            <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
            </p>
            <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
            </p>
          </div>
        </div>
      </div>
    );
  }

  handleCloseClick() {
    this.props.onClose();
  }
}

function mapStateToProps(state) {
  return {
    open: state.shelf.open
  };
}

const mapDispatchToProps = {
  onClose: toggleShelf
};

export default connect(mapStateToProps, mapDispatchToProps)(Shelf);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Counter.css';

class Counter extends Component {
  render() {
    return (
      <div className="lb-c-counter">{this.props.current} of {this.props.total}</div>
    );
  }
}

Counter.propTypes = {
  current: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired
}
export default Counter;

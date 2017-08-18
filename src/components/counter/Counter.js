import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Counter.css';

class Counter extends Component {
  render() {
    return (
      <div className="lb-c-counter">{this.props.label}</div>
    );
  }
}

Counter.propTypes = {
  label: PropTypes.string.isRequired
}

export default Counter;

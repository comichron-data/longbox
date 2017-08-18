import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Spinner.css';

class Spinner extends Component {
  render() {
    const styles = {
      color: this.props.color
    };
    return (
      <div className="lb-c-spinner" style={styles} data-spinner-text={ this.props.spinnerText }>
        <div className="lb-c-spinner__block lb-c-spinner__block--50 lb-c-spinner__block--animate"></div>
        <div className="lb-c-spinner__block lb-c-spinner__block--50 lb-c-spinner__block--animate"></div>
        <div className="lb-c-spinner__block lb-c-spinner__block--100 lb-c-spinner__block--animate"></div>
        <div className="lb-c-spinner__block lb-c-spinner__block--25 lb-c-spinner__block--animate"></div>
        <div className="lb-c-spinner__block lb-c-spinner__block--25 lb-c-spinner__block--animate"></div>
        <div className="lb-c-spinner__block lb-c-spinner__block--50 lb-c-spinner__block--animate"></div>
      </div>
    );
  }
}


Spinner.propTypes = {
  color: PropTypes.string
}
export default Spinner;

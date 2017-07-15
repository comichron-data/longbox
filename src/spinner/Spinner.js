import React, { Component } from 'react';
import './Spinner.css';

class Spinner extends Component {
  render() {
    return (
      <div className="lb-c-spinner">
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

export default Spinner;

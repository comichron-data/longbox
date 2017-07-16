import React, { Component } from 'react';
import './Page.css';

import Spinner from '../spinner/Spinner';

class Page extends Component {
  render() {
    const style = {
      "background-image": `url("${this.props.imageUrl}")`,
      "height": this.props.imageHeight
    };

    return (
      <div className="lb-c-page" style={ style }>
        <Spinner
          spinnerText="loading"
          
        />
      </div>
    );
  }
}

export default Page;

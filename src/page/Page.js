import React, { Component } from 'react';
import './Page.css';

import Spinner from '../spinner/Spinner';

class Page extends Component {
  render() {
    const style = {
      "background-image": 'url("http://fillmurray.com/800/1223")',
      "height": this.props.imageHeight
    };

    return (
      <div className="lb-c-page" style={ style }>
        <Spinner />
      </div>
    );
  }
}

export default Page;

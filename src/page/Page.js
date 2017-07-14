import React, { Component } from 'react';
import './Page.css';

class Page extends Component {
  render() {
    const style = {
      "background-image": 'url("http://fillmurray.com/800/1223")',
      "height": this.props.imageHeight
    };

    return (
      <div className="lb-c-page" style={ style }></div>
    );
  }
}

export default Page;

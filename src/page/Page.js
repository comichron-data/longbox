import React, { Component } from 'react';
import './Page.css';

import Spinner from '../spinner/Spinner';

class Page extends Component {
  render() {
    const hideIfProp = prop => element => prop ? null : element;
    const whenImagePropIsLoadedHide = hideIfProp(this.props.imageUrl);
    const style = {
      backgroundImage: `url("${this.props.imageUrl}")`,
      height: `${this.props.imageHeight}`
    };

    return (
      <div className="lb-c-page" style={style}>
        {whenImagePropIsLoadedHide(<Spinner spinnerText="Loading" color="purple"/>)}
      </div>
    );
  }
}

export default Page;

import React, { Component } from 'react';
import './Page.css';

import Spinner from '../spinner/Spinner';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loaded: props.readyToLoad || false
    };
  }

  componentWillReceiveProps(nextProps) {
    const {readyToLoad} = nextProps;
    if (readyToLoad && !this.state.loading && !this.state.loaded) {
      this.lazyLoadImage();
    }
  }

  lazyLoadImage() {
    const loader = () => {
      this._image.removeEventListener('load', loader);
      this._image = null;
      this.setState({
        loading: false,
        loaded: true
      });

      console.log('image loaded!')
    };

    this._image = new Image();
    this._image.src = this.props.imageUrl;
    this._image.addEventListener('load', loader);

    console.log('triggered image lazy load')

    this.setState({
      loading: true
    });
  }

  render() {
    const hideIfProp = prop => element => prop ? null : element;
    const whenImageIsLoadedHide = hideIfProp(this.state.loaded);
    const style = this.styleObject();

    return (
      <div className="lb-c-page">
        <img className="lb-c-page__image" style={style} src={this.props.imageUrl}/>
      </div>
    );
  }

  styleObject() {
    const style = {
    };

    if (this.state.loaded) {
      // style.height = `${this.props.imageHeight}`;
      // style.backgroundImage = `url("${this.props.imageUrl}")`;
    }

    return style;
  }
}

export default Page;

// {whenImageIsLoadedHide(<Spinner spinnerText="Loading" color="white"/>)}
// </img>

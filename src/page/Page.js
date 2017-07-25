import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Page.css';

// import Spinner from '../spinner/Spinner';

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
    return (
      <div className="lb-c-page">
        <img alt={this.props.imageUrl} className="lb-c-page__image" src={this.props.imageUrl}/>
      </div>
    );
  }
}

Page.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  readyToLoad: PropTypes.bool
}

export default Page;

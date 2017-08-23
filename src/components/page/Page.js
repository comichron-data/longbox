import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Page.css';

// from http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever
const spacerGif = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

class Page extends Component {
  constructor(props) {
    super(props);

    this.handleImageLoad = this.handleImageLoad.bind(this);
  }

  render() {
    const imgProps = {
      className: 'lb-c-page__image',
      src: this.imageUrl(),
      onLoad: this.handleImageLoad
    };

    return (
      <div className="lb-c-page">
        <img {...imgProps} alt={`Comic Page: ${this.props.imageUrl}`}/>
      </div>
    );
  }

  imageUrl() {
    return this.props.readyToLoad ? this.props.imageUrl : spacerGif;
  }

  handleImageLoad() {
    if (this.props.readyToLoad && this.props.onLoad) {
      this.props.onLoad(this.props.id);
    }
  }
}

Page.propTypes = {
  id: PropTypes.string.isRequired,
  onLoad: PropTypes.func,
  imageUrl: PropTypes.string.isRequired,
  readyToLoad: PropTypes.bool
}

export default Page;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Page.css';

// import Spinner from '../spinner/Spinner';

class Page extends Component {
  constructor(props) {
    super(props);

    this.handleImageLoad = this.handleImageLoad.bind(this);
  }

  render() {
    const imgProps = {
      alt: this.props.imageUrl,
      className: 'lb-c-page__image',
      // TODO use a blank data url placeholder? img w/o src might not be valid
      src: this.props.readyToLoad ? this.props.imageUrl : null,
      onLoad: this.handleImageLoad
    };

    return (
      <div className="lb-c-page">
        <img {...imgProps} />
      </div>
    );
  }

  handleImageLoad() {
    this.props.onLoad(this.props.id);
  }
}

Page.propTypes = {
  id: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  readyToLoad: PropTypes.bool
}

export default Page;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Page.css';


import CommentBubble from '../comment-bubble/CommentBubble';
import Comment from '../comment/Comment';
// import Spinner from '../spinner/Spinner';

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
        <div className="lb-c-page__comment-wraper">
          <img {...imgProps} alt={`Comic Page: ${this.props.imageUrl}`}/>
          <CommentBubble x={10} y={10}>
            <Comment name="Cameron Leslie" commentText="Your mother..." date="somedate"/>
          </CommentBubble>
          <CommentBubble x={23} y={90}>
            <Comment name="Cameron Leslie" commentText="Your mother..." date="somedate"/>
          </CommentBubble>
          <CommentBubble x={2} y={30}>
            <Comment name="Cameron Leslie" commentText="Your mother..." date="somedate"/>
          </CommentBubble>
        </div>
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

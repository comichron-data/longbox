import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Comment.css';

class Comment extends Component {
  render() {
    return (
      <div className="lb-c-comment">
        <strong>{this.props.name}</strong>
        <p>{this.props.commentText}</p>
        <small>{this.props.date}</small>
      </div>
    );
  }
}

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  commentText: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired
}

export default Comment;

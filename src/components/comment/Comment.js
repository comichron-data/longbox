import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Comment.css';

class Comment extends Component {
  render() {
    return (
      <div className="lb-c-comment">
        <strong  className="lb-c-comment__name">{this.props.name}</strong>
        <div className="lb-c-comment__body">{this.props.body}</div>
        <div className="lb-c-comment__date">{this.props.date}</div>
      </div>
    );
  }
}

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired
}

export default Comment;

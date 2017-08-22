import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CommentBubble.css';

class CommentBubble extends Component {
  render() {
    const style = {
      top: `${this.props.y}%`,
      left: `calc(${this.props.x}% - 6em)`
    }
    return (
      <div className="lb-c-comment-bubble" style={style}>
        {this.props.children}
      </div>
    );
  }
}

CommentBubble.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
}

export default CommentBubble;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShareButton extends Component {
  constructor(props) {
    super(props);
    

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const shareIcon = this.renderIcon();

    return (
      <span>
        <button className="lb-c-controls__button" onClick={this.handleClick}>{shareIcon}</button>
        <button className="lb-c-controls__button lb-c-controls__button--animate-in" onClick={this.handleClick}>{shareIcon}</button>
        <button className="lb-c-controls__button lb-c-controls__button--animate-in" onClick={this.handleClick}>{shareIcon}</button>
      </span>
    );
  }

  renderIcon() {
    const iconSize = '2em';
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1344 1024q133 0 226.5 93.5t93.5 226.5-93.5 226.5-226.5 93.5-226.5-93.5-93.5-226.5q0-12 2-34l-360-180q-92 86-218 86-133 0-226.5-93.5t-93.5-226.5 93.5-226.5 226.5-93.5q126 0 218 86l360-180q-2-22-2-34 0-133 93.5-226.5t226.5-93.5 226.5 93.5 93.5 226.5-93.5 226.5-226.5 93.5q-126 0-218-86l-360 180q2 22 2 34t-2 34l360 180q92-86 218-86z" fill="#fff"/></svg>
    );
  }

  handleClick() {
    this.props.onClick();
  }
}

ShareButton.propTypes = {
  // are we currently in fullscreen mode
  onClick: PropTypes.func.isRequired
}

export default ShareButton;

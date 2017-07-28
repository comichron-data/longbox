import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FullscreenButton.css';

import fscreen from 'fscreen';

class FullscreenButton extends Component {
  constructor(props) {
    super(props);
    this.state = {isFullscreen: false};

    this.toggleFullscreen = this.toggleFullscreen.bind(this);
  }

  toggleFullscreen() {
    if (this.state.isFullscreen) {
      fscreen.exitFullscreen();
      this.setState({ isFullscreen: false });
    } else {
      fscreen.requestFullscreen(document.getElementById(this.props.fullScreenId))
      this.setState({ isFullscreen: true });
    }
  }

  render() {
    const iconSize = '2em';
    const expandFullScreenIcon = <svg width={iconSize} height={iconSize} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M883 1056q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19h-448q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23zm781-864v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45z" fill="#fff"/></svg>
    const compressFullScreenIcon = <svg width={iconSize} height={iconSize} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M896 960v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45zm755-672q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19h-448q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23z" fill="#fff"/></svg>
    return (
      <button className="lb-c-controls__button" onClick={this.toggleFullscreen}>{this.state.isFullscreen ? compressFullScreenIcon : expandFullScreenIcon}</button>
    );
  }
}

FullscreenButton.propTypes = {
  fullScreenId: PropTypes.string.isRequired
}

export default FullscreenButton;

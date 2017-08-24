import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Controls.css';
import FullscreenButton from '../fullscreen-button/FullscreenButton';
import ShareButton from '../share-button/ShareButton';


class Controls extends Component {
  render() {
    return (
      <div className="lb-c-controls">
        <FullscreenButton {...this.props.fullscreen} />
        <ShareButton shareUrl={this.props.shareUrl} tweet={this.props.tweet} />
      </div>
    );
  }
}

Controls.propTypes = {
  fullscreen: PropTypes.shape({
    // are we currently in fullscreen mode
    isFullscreen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  }),
  shareUrl: PropTypes.string.isRequired,
  tweet: PropTypes.string.isRequired
}

export default Controls;

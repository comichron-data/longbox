import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  toggleFullscreen
} from '../../actions';

import './Controls.css';
import FullscreenButton from '../fullscreen-button/FullscreenButton';
import ShareButton from '../share-button/ShareButton';

class Controls extends Component {
  render() {
    return (
      <div className="lb-c-controls">
        <FullscreenButton isFullscreen={this.props.isFullscreen} onClick={this.props.onToggleFullscreen} />
        <ShareButton shareUrl={this.props.shareUrl} tweet={this.props.tweet} />
      </div>
    );
  }
}

Controls.propTypes = {
  // are we currently in fullscreen mode
  isFullscreen: PropTypes.bool.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired,
  shareUrl: PropTypes.string.isRequired,
  tweet: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    isFullscreen: state.controls.isFullscreen,
    shareUrl: state.controls.shareUrl,
    tweet: state.controls.tweet
  };
}

const mapDispatchToProps = {
  onToggleFullscreen: toggleFullscreen
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);

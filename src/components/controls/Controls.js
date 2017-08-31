import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  toggleFullscreen,
  toggleShelf
} from '../../actions';

import './Controls.css';
import FullscreenButton from '../fullscreen-button/FullscreenButton';
import ShareButton from '../share-button/ShareButton';
import AboutButton from './AboutButton';
import Icon from './Icon';
import Button from './Button';

class Controls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingSharing: false
    };

    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleTwitterClick = this.handleTwitterClick.bind(this);
    this.handleFacebookClick = this.handleFacebookClick.bind(this);
  }

  render() {
    return (
      <div className="lb-c-controls">
        <FullscreenButton isFullscreen={this.props.isFullscreen} onClick={this.props.onToggleFullscreen} />
        <AboutButton onClick={this.props.onShowAbout} />
        <ShareButton onClick={this.handleShareClick} />
        {this.renderFacebookButton()}
        {this.renderTwitterButton()}
      </div>
    );
  }

  handleShareClick() {
    this.setState({
      showingSharing: !this.state.showingSharing
    });
  }

  renderFacebookButton() {
    if (!this.state.showingSharing) return null;

    return (
      <Button key="facebook" label="Share on Facebook" onClick={this.handleFacebookClick} animateIn={true}>
        <Icon type="facebook" />
      </Button>
    );
  }

  renderTwitterButton() {
    if (!this.state.showingSharing) return null;

    return (
      <Button key="twitter" label="Share on Twitter" onClick={this.handleTwitterClick} animateIn={true}>
        <Icon type="twitter" />
      </Button>
    );
  }

  handleFacebookClick() {
    const escaped = encodeURIComponent(this.props.shareUrl);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${escaped}`;

    window.open(shareUrl);
  }

  handleTwitterClick() {
    const tweet = encodeURIComponent(this.props.tweet);
    const shareUrl = `https://twitter.com/home?status=${tweet}`;

    window.open(shareUrl);
  }
}

Controls.propTypes = {
  // are we currently in fullscreen mode
  isFullscreen: PropTypes.bool.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired,
  onShowAbout: PropTypes.func.isRequired,
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
  onToggleFullscreen: toggleFullscreen,
  onShowAbout: toggleShelf
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as tabIndex from '../../tab-index';
import Icon from '../controls/Icon';
import Button from '../controls/Button';

class ShareButton extends Component {
  static propTypes = {
    tweet: PropTypes.string.isRequired,
    shareUrl: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTwitterClick = this.handleTwitterClick.bind(this);
    this.handleFacebookClick = this.handleFacebookClick.bind(this);
  }

  render() {
    return (
      <span>
        <Button onClick={this.handleClick} label={this.label()} tabIndex={tabIndex.shareButton}>
          <Icon type="share" />
        </Button>
        {this.renderSocialMediaButtons()}
      </span>
    );
  }

  label() {
    if (this.state.open) {
      return 'Hide share options';
    } else {
      return 'Show share options';
    }
  }

  renderSocialMediaButtons() {
    if (this.state.open) {
      return [
        <Button key="facebook" label="Share on Facebook" onClick={this.handleFacebookClick} animateIn={true} tabIndex={tabIndex.facebookButton}>
          <Icon type="facebook" />
        </Button>,
        <Button key="twitter" label="Share on Twitter" onClick={this.handleTwitterClick} animateIn={true} tabIndex={tabIndex.twitterButton}>
          <Icon type="twitter" />
        </Button>
      ];
    } else {
      return [];
    }
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    });
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

export default ShareButton;

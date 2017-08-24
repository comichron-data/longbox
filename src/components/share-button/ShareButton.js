import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <Button onClick={this.handleClick}>
          <Icon type="share" />
        </Button>
        {this.renderSocialMediaButtons()}
      </span>
    );
  }

  renderSocialMediaButtons() {
    if (this.state.open) {
      return [
        <Button key="facebook" onClick={this.handleFacebookClick} animateIn={true}>
          <Icon type="facebook" />
        </Button>,
        <Button key="twitter" onClick={this.handleTwitterClick} animateIn={true}>
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

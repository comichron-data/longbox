import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '../controls/Icon';
import Button from '../controls/Button';

class FullscreenButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const icon = this.renderIcon();

    return (
      <Button aria-label="fullscreen" onClick={this.handleClick}>
        {icon}
      </Button>
    );
  }

  renderIcon() {
    if (this.props.isFullscreen) {
      return <Icon type="exit-fullscreen" />;
    } else {
      return <Icon type="enter-fullscreen" />;
    }
  }

  handleClick() {
    this.props.onClick();
  }
}

FullscreenButton.propTypes = {
  // are we currently in fullscreen mode
  isFullscreen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default FullscreenButton;

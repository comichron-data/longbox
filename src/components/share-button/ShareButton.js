import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '../controls/Icon';
import Button from '../controls/Button';

class ShareButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <Button onClick={this.handleClick} label={this.label()}>
        <Icon type="share" />
      </Button>
    );
  }

  label() {
    if (this.state.open) {
      return 'Hide share options';
    } else {
      return 'Show share options';
    }
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    });

    this.props.onClick();
  }
}

export default ShareButton;

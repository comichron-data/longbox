import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';
import Button from './Button';

class AboutButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <Button label="About" onClick={this.handleClick}>
        <Icon type="about" />
      </Button>
    );
  }

  handleClick() {
    this.props.onClick();
  }
}

AboutButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default AboutButton;

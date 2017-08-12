import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavigationButton from './NavigationButton';
import './Navigation.css';

class Navigation extends Component {
  static propTypes = {
    buttonCount: PropTypes.oneOf([1, 2, 3]),
    onPrimaryClick: PropTypes.func.isRequired,
    onSecondaryClick: PropTypes.func,
    onTertiaryClick: PropTypes.func
  };

  static defaultProps = {
    buttonCount: 1
  };

  constructor(props) {
    super(props);

    this.handlePrimaryClick = this.handlePrimaryClick.bind(this);
    this.handleSecondaryClick = this.handleSecondaryClick.bind(this);
    this.handleTertiaryClick = this.handleTertiaryClick.bind(this);
  }

  render() {
    return (
      <div className="lb-c-navigation">
        {this.renderLeft()}
        {this.renderCenter()}
        {this.renderRight()}
      </div>
    );
  }

  renderLeft() {
    if (this.props.buttonCount >= 2) {
      return (
        <NavigationButton key="left" onClick={this.handleSecondaryClick} />
      );
    } else {
      return null;
    }
  }

  renderCenter() {
    if (this.props.buttonCount === 3) {
      return (
        <NavigationButton key="center" onClick={this.handleTertiaryClick} />
      );
    } else {
      return null;
    }
  }

  renderRight() {
    return (
      <NavigationButton key="right" onClick={this.handlePrimaryClick} />
    );
  }

  handlePrimaryClick() {
    this.props.onPrimaryClick();
  }

  handleSecondaryClick() {
    this.props.onSecondaryClick();
  }

  handleTertiaryClick() {
    this.props.onTertiaryClick();
  }
}

export default Navigation;

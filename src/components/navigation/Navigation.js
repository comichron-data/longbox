import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';

import NavigationButton from './NavigationButton';
import './Navigation.css';

class Navigation extends Component {
  static propTypes = {
    buttonCount: PropTypes.oneOf([1, 2, 3]),
    onPrimaryClick: PropTypes.func.isRequired,
    onSecondaryClick: PropTypes.func,
    onTertiaryClick: PropTypes.func,
    onSwiping: PropTypes.func.isRequired,
    onSwiped: PropTypes.func.isRequired
  };

  static defaultProps = {
    buttonCount: 1
  };

  constructor(props) {
    super(props);

    this.handlePrimaryClick = this.handlePrimaryClick.bind(this);
    this.handleSecondaryClick = this.handleSecondaryClick.bind(this);
    this.handleTertiaryClick = this.handleTertiaryClick.bind(this);

    this.handleSwiping = this.handleSwiping.bind(this);
    this.handleSwiped = this.handleSwiped.bind(this);
  }

  render() {
    return (
      <Swipeable
        onSwiping={this.handleSwiping}
        onSwiped={this.handleSwiped}
        innerRef={this.processReactSwipeableDiv}
      >
        {this.renderLeft()}
        {this.renderCenter()}
        {this.renderRight()}
      </Swipeable>
    );
  }

  processReactSwipeableDiv(element) {
    if (element != null) {
      element.classList.add('lb-c-navigation');
    }
  }

  handleSwiping(event, deltaX) {
    this.props.onSwiping(deltaX);
  }

  handleSwiped(event, deltaX) {
    this.props.onSwiped(deltaX);
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
        <NavigationButton key="center" type="center" onClick={this.handleTertiaryClick} />
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

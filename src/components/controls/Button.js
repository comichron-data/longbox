import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    tabIndex: PropTypes.number.isRequired,
    animateIn: PropTypes.bool
  }

  static defaultProps = {
    animateIn: false
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <button
        className={this.className()}
        onClick={this.handleClick}
        aria-label={this.props.label}
        tabIndex={this.props.tabIndex}
      >
        {this.props.children}
      </button>
    );
  }

  className() {
    const classes = ['lb-c-controls__button'];

    if (this.props.animateIn) {
      classes.push('lb-c-controls__button--animate-in');
    }

    return classes.join(' ');
  }

  handleClick() {
    this.props.onClick();
  }
}

export default Button;

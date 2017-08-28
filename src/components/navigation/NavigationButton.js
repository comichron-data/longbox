import React from 'react';
import PropTypes from 'prop-types';

export default function NavigationButton(props) {
  const className = props.type === 'center'
    ? 'lb-c-navigation__button lb-c-navigation__button--center'
    : 'lb-c-navigation__button';

  return (
    <div
      className={className}
      onClick={props.onClick}
      role="button"
      aria-label={props.label}
    />
  );
}

NavigationButton.propTypes = {
  type: PropTypes.oneOf(['center', 'side']),
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

NavigationButton.defaultProps = {
  type: 'side'
};

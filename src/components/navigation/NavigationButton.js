import React from 'react';

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
      tabIndex={props.tabIndex}
    />
  );
}

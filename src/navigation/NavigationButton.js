import React from 'react';

export default function NavigationButton(props) {
  const className = 'lb-c-navigation__button';

  return <div className={className} onClick={props.onClick} />;
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Controls.css';
import FullscreenButton from '../fullscreen-button/FullscreenButton';


class Controls extends Component {
  render() {
    const iconSize = '2em';
    const commentaryIcon = <svg width={iconSize} height={iconSize} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1792 896q0 174-120 321.5t-326 233-450 85.5q-70 0-145-8-198 175-460 242-49 14-114 22-17 2-30.5-9t-17.5-29v-1q-3-4-.5-12t2-10 4.5-9.5l6-9 7-8.5 8-9q7-8 31-34.5t34.5-38 31-39.5 32.5-51 27-59 26-76q-157-89-247.5-220t-90.5-281q0-130 71-248.5t191-204.5 286-136.5 348-50.5q244 0 450 85.5t326 233 120 321.5z" fill="#fff"/></svg>
        return (
      <div className="lb-c-controls">
        <button className="lb-c-controls__button" onClick="">{commentaryIcon}</button>
        <FullscreenButton {...this.props.fullscreen} />
      </div>
    );
  }
}

Controls.propTypes = {
  fullscreen: PropTypes.shape({
    // are we currently in fullscreen mode
    isFullscreen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  })
}

export default Controls;

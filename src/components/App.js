import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  goToNextPage,
  goToPreviousPage,
  toggleControls,
  toggleFullscreen,
  pageLoaded
} from '../actions';

import './App.css';
import Carousel from './carousel/Carousel'

class App extends Component {
  static propTypes = {
    currentPageIndex: PropTypes.number.isRequired,
    pages: PropTypes.array.isRequired,
    isShowingControls: PropTypes.bool.isRequired,
    isFullscreen: PropTypes.bool.isRequired,

    onNextPage: PropTypes.func.isRequired,
    onPreviousPage: PropTypes.func.isRequired,
    onToggleControls: PropTypes.func.isRequired,
    onToggleFullscreen: PropTypes.func.isRequired,
    onPageLoad: PropTypes.func.isRequired
  };

  render() {
    return (
      <Carousel
        currentPageIndex={this.props.currentPageIndex}
        pages={this.props.pages}
        isShowingControls={this.props.isShowingControls}
        isFullscreen={this.props.isFullscreen}

        onNextPage={this.props.onNextPage}
        onPreviousPage={this.props.onPreviousPage}
        onToggleControls={this.props.onToggleControls}
        onToggleFullscreen={this.props.onToggleFullscreen}
        onPageLoad={this.props.onPageLoad}
      />
    );
  }
}

function mapStateToProps(state) {
  const pages = state.pages.idsInOrder
    .map(id => state.pages.byId[id]);

  return {
    pages,
    currentPageIndex: state.pages.currentPageIndex,
    isShowingControls: state.controls.visible,
    isFullscreen: state.controls.isFullscreen
  }
}

const mapDispatchToProps = {
  onNextPage: goToNextPage,
  onPreviousPage: goToPreviousPage,
  onToggleControls: toggleControls,
  onToggleFullscreen: toggleFullscreen,
  onPageLoad: pageLoaded
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  goToNextPage,
  goToPreviousPage,
  toggleControls,
  toggleFullscreen
} from './actions';

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
    onToggleFullscreen: PropTypes.func.isRequired
  };

  render() {
    return (
      <Carousel
        pages={this.props.pages}
        onNextPage={this.props.onNextPage}
        onPreviousPage={this.props.onPreviousPage}
        currentPageIndex={this.props.currentPageIndex}
        isShowingControls={this.props.isShowingControls}
        isFullscreen={this.props.isFullscreen}
        onToggleControls={this.props.onToggleControls}
        onToggleFullscreen={this.props.onToggleFullscreen}
        lazyLoadBufferSize={3}
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
  onToggleFullscreen: toggleFullscreen
};


export default connect(mapStateToProps, mapDispatchToProps)(App);

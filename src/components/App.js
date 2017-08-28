import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  goToNextPage,
  goToPreviousPage,
  toggleControls,
  pageLoaded
} from '../actions';

import './App.css';
import Carousel from './carousel/Carousel'

class App extends Component {
  static propTypes = {
    currentPageIndex: PropTypes.number.isRequired,
    pages: PropTypes.array.isRequired,
    isShowingControls: PropTypes.bool.isRequired,

    onNextPage: PropTypes.func.isRequired,
    onPreviousPage: PropTypes.func.isRequired,
    onToggleControls: PropTypes.func.isRequired,
    onPageLoad: PropTypes.func.isRequired
  };

  render() {
    return (
      <Carousel
        currentPageIndex={this.props.currentPageIndex}
        pages={this.props.pages}
        isShowingControls={this.props.isShowingControls}

        onNextPage={this.props.onNextPage}
        onPreviousPage={this.props.onPreviousPage}
        onToggleControls={this.props.onToggleControls}
        onPageLoad={this.props.onPageLoad}
      />
    );
  }
}

function mapStateToProps(state) {
  const pages = state.pages.idsInOrder
    .map(id => state.pages.byId[id]);

  const {currentPageId} = state.pages;
  const currentPageIndex = state.pages.idsInOrder.indexOf(currentPageId);

  return {
    pages,
    currentPageIndex,
    isShowingControls: state.controls.visible
  }
}

const mapDispatchToProps = {
  onNextPage: goToNextPage,
  onPreviousPage: goToPreviousPage,
  onToggleControls: toggleControls,
  onPageLoad: pageLoaded
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

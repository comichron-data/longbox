import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  goToNextPage,
  goToPreviousPage
} from './actions';
import './App.css';
import Carousel from './carousel/Carousel'


const pageCount = 15;
const pages = new Array(pageCount).fill(1)
  .map((p, index, array) => {
    return {
      id: `page-${index}`,
      url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
      preload: false,
      label: `${index + 1} of ${array.length}`
    };
  });

pages[0].preload = true;

class App extends Component {
  static propTypes = {
    currentPageIndex: PropTypes.number.isRequired,
    pages: PropTypes.array.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onPreviousPage: PropTypes.func.isRequired
  };

  render() {
    return (
      <Carousel
        pages={pages}
        onNextPage={this.props.onNextPage}
        onPreviousPage={this.props.onPreviousPage}
        currentPageIndex={this.props.currentPageIndex}
        lazyLoadBufferSize={3}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    pages: state.pages.pages,
    currentPageIndex: state.pages.currentPageIndex
  }
}

const mapDispatchToProps = {
  onNextPage: goToNextPage,
  onPreviousPage: goToPreviousPage
};


export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import {connect} from 'react-redux';

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
  render() {
    return (
      <div>
        <span>{this.props.data}</span>
        <Carousel pages={pages} lazyLoadBufferSize={3} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.value
  }
}

export default connect(mapStateToProps)(App);

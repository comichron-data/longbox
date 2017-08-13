import React, { Component } from 'react';
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
      <Carousel pages={pages} lazyLoadBufferSize={3} />
    );
  }
}

export default App;

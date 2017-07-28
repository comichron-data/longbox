import React, { Component } from 'react';
import './App.css';

import Carousel from './carousel/Carousel'

const pageCount = 5;
const pages = new Array(pageCount).fill(1)
  .map((p, index, array) => {
    return {
      id: `page-${index}`,
      url: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
      preload: false,
      label: `${index + 1} of ${array.length}`
    };
  });

// tweak to first and last to simulate page differences
pages[0].preload = true;
pages[pages.length - 1].label = 'Back matter 1';

class App extends Component {
  render() {
    return (
      <Carousel pages={pages} />
    );
  }
}

export default App;

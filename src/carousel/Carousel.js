import React, { Component } from 'react';
import './Carousel.css';

import Page from '../page/Page';

class Carousel extends Component {
  render() {
    const styles = {
      width: '400vw', // page count * 100vw
      left: '-200vw' // (page number - 1) * 100vw
    }
    return (
      <div className="lb-c-carousel">
        <div className="lb-c-carousel__slide" style={styles}>
          {/* map starts here */}
          <div className="lb-c-carousel__item">
            <Page imageUrl="http://www.harkavagrant.com/history/wutheringsixsm.png" imageHeight="1481px" />
          </div>
          {/* map ends here */}
          <div className="lb-c-carousel__item">
            <Page imageUrl="http://www.harkavagrant.com/history/wutheringsixsm.png" imageHeight="1481px" />
          </div>
          <div className="lb-c-carousel__item">
            <Page imageUrl="http://www.harkavagrant.com/history/wutheringsixsm.png" imageHeight="1481px" />
          </div>
          <div className="lb-c-carousel__item">
            <Page imageUrl="http://www.harkavagrant.com/history/wutheringsixsm.png" imageHeight="1481px" />
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;

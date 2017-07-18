import React, { Component } from 'react';
import './Carousel.css';

import Page from '../page/Page';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideCount: 4,
      currentSlideIndex: 0
    };

    // pre-bind event handlers
    this.handleForwardClick = this.handleForwardClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleForwardClick() {
    this.goToPage(this.state.currentSlideIndex + 1);
  }

  handleBackClick() {
    this.goToPage(this.state.currentSlideIndex - 1);
  }

  goToPage(pageNumber) {
    if (pageNumber >= 0 && pageNumber < this.state.slideCount) {
      this.setState({
        currentSlideIndex: pageNumber
      });
    }
  }

  render() {
    const styles = {
      width: '400vw', // page count * 100vw
      transform: `translateX(-${this.state.currentSlideIndex * 100}vw)` // {-(page number index) * 100vw}
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
        <div className="lb-c-carousel__navigation">
          <button className="lb-c-carousel__button lb-c-carousel__nav-backward" onClick={this.handleBackClick}>B</button>
          <button className="lb-c-carousel__button lb-c-carousel__nav-forward" onClick={this.handleForwardClick}>F</button>
        </div>
      </div>
    );
  }
}

export default Carousel;

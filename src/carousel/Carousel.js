import React, { Component } from 'react';
import './Carousel.css';

import Page from '../page/Page';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [
        {
          imageUrl: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
          readyToLoad: true,
          loaded: false
        },
        {
          imageUrl: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
          readyToLoad: false,
          loaded: false
        },
        {
          imageUrl: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
          readyToLoad: false,
          loaded: false
        },
        {
          imageUrl: 'http://www.harkavagrant.com/history/wutheringsixsm.png',
          readyToLoad: false,
          loaded: false
        }
      ],
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

      // fake delay just to see it lazy load in
      setTimeout(() => {
        const pages = this.state.pages
          .map((page, index) => {
            if (index === pageNumber) {
              return Object.assign({}, page, {readyToLoad: true});
            } else {
              return page;
            }
          });

        this.setState({
          pages
        });
      }, 100000)

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

    const pages = this.state.pages
      .map((page, index) => {
        return (
          <div key={index} className="lb-c-carousel__item">
            <Page
              imageUrl={page.imageUrl}
              readyToLoad={page.readyToLoad}
              imageHeight="1481px"
            />
          </div>
        );
      });

    return (
      <div className="lb-c-carousel">
        <div className="lb-c-carousel__slide" style={styles}>
          {pages}
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

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
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
    this.scrollToTop();
    this.goToPage(this.state.currentSlideIndex + 1);
  }

  handleBackClick() {
    this.scrollToTop();
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
      }, 1000)

      this.setState({
        currentSlideIndex: pageNumber
      });
    }
  }

  scrollToTop() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  render() {
    const styles = {
      width: `${(this.state.pages.length * 100)}vw`, // page count * 100vw
      transform: `translateX(-${this.state.currentSlideIndex * 100}vw)` // {-(page number index) * 100vw}
    }

    const pages = this.state.pages
      .map((page, index) => {
        return (
          <div key={index} className="lb-c-carousel__item">
            <Page
              imageUrl={page.imageUrl}
              readyToLoad={page.readyToLoad}
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
          <button className="lb-c-carousel__button lb-c-carousel__nav-backward" onClick={this.handleBackClick}></button>
          <button className="lb-c-carousel__button lb-c-carousel__nav-forward" onClick={this.handleForwardClick}></button>
          <div className="lb-js-carousel__ui lb-c-carousel__counter"><div className="lb-c-carousel__counter-text">{this.state.currentSlideIndex + 1} of {this.state.pages.length}</div></div>
        </div>
      </div>
    );
  }
}

export default Carousel;

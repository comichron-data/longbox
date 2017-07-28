import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './Carousel.css';

import Page from '../page/Page';
import Counter from '../counter/Counter';
import Controls from '../controls/Controls';

class Carousel extends Component {
  constructor(props) {
    super(props);

    const pages = props.pages
      .map(page => {
        return Object.assign({}, page, {
          readyToLoad: page.preload
        })
      });

    this.state = {
      pages,
      slideCount: pages.length,
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
      const pages = this.state.pages
        .map((page, index) => {
          if (index === pageNumber) {
            return Object.assign({}, page, {readyToLoad: true});
          } else {
            return page;
          }
        });

      this.setState({
        pages,
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

    return (
      <div className="lb-c-carousel">

        <div className="lb-c-carousel__slide" style={styles}>
          {this.renderPages()}
        </div>

        <div className="lb-c-carousel__ui">

          <button className="lb-c-carousel__button lb-c-carousel__nav-backward" onClick={this.handleBackClick}></button>
          <button className="lb-c-carousel__button lb-c-carousel__nav-forward" onClick={this.handleForwardClick}></button>

          <div className="lb-c-carousel__toolbar lb-c-carousel__toolbar--counter">
            {this.renderCounter()}
          </div>

          <div className="lb-js-carousel__ui lb-c-carousel__toolbar lb-c-carousel__toolbar--controls">
            <Controls />
          </div>

        </div>

      </div>
    );
  }

  renderPages() {
    return this.state.pages
      .map(page => {
        return (
          <div key={page.id} className="lb-c-carousel__item">
            <Page
              imageUrl={page.url}
              readyToLoad={page.readyToLoad}
            />
          </div>
        );
      });
  }

  getCurrentPageProps() {
    return this.state.pages[this.state.currentSlideIndex];
  }

  renderCounter() {
    const {label} = this.getCurrentPageProps();
    return <Counter label={label} />;
  }
}

export default Carousel;

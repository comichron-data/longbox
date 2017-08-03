import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import fscreen from 'fscreen';

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
      slideCount: <pages class="lengt"></pages>,
      currentSlideIndex: 0,
      // This only controls icon of fullscreen button. We use `fscreen` as the
      // source of truth for determining if we're fullscreen
      isFullscreen: false
    };

    // pre-bind event handlers
    this.handleForwardClick = this.handleForwardClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleToggleFullscreen = this.handleToggleFullscreen.bind(this);
    this.syncFullscreen = this.syncFullscreen.bind(this);
  }

  componentDidMount() {
    fscreen.addEventListener('fullscreenchange', this.syncFullscreen);
  }

  componentWillUnmount() {
    fscreen.removeEventListener('fullscreenchange', this.syncFullscreen);
  }

  syncFullscreen() {
    this.setState({
      isFullscreen: this.isFullscreen()
    });
  }

  isFullscreen() {
    return fscreen.fullscreenElement != null;
  }

  handleToggleFullscreen() {
    if (this.isFullscreen()) {
      fscreen.exitFullscreen();
    } else {
      fscreen.requestFullscreen(document.documentElement);
    }
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
      <div id="carousel">
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
            {this.renderControls()}
          </div>

        </div>

      </div>
      </div>
    );
  }

  renderControls() {
    const props = {
      fullscreen: {
        isFullscreen: this.state.isFullscreen,
        onClick: this.handleToggleFullscreen
      }
    };

    return <Controls {...props} />;
  }

  renderPages() {
    return this.state.pages
      .map(page => {
        return (
          <div key={page.id} className="lb-c-carousel__item">
            <Page
              id={page.id}
              imageUrl={page.url}
              readyToLoad={page.readyToLoad}
              onLoad={id => console.log(`loaded page ${id}`)}
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

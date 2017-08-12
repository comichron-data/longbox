import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import fscreen from 'fscreen';

import './Carousel.css';

import Page from '../page/Page';
import Counter from '../counter/Counter';
import Controls from '../controls/Controls';
import Navigation from '../navigation/Navigation';

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
      currentSlideIndex: 0,
      // This only controls icon of fullscreen button. We use `fscreen` as the
      // source of truth for determining if we're fullscreen
      isFullscreen: false,
      isShowingControls: false
    };

    // pre-bind event handlers
    this.handlePrimaryClick = this.handlePrimaryClick.bind(this);
    this.handleSecondaryClick = this.handleSecondaryClick.bind(this);
    this.handleTertiaryClick = this.handleTertiaryClick.bind(this);
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

  handleTertiaryClick() {
    this.setState({
      isShowingControls: !this.state.isShowingControls
    });
  }

  handlePrimaryClick() {
    const success = this.goToPage(this.state.currentSlideIndex + 1);

    if (success) {
      this.scrollToTop();
    }
  }

  handleSecondaryClick() {
    const success = this.goToPage(this.state.currentSlideIndex - 1);

    if (success) {
      this.scrollToTop();
    }
  }

  /**
  * @return {Boolean} true if page change was successful, false otherwise
  */
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

      return true;
    } else {
      return false;
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

            <Navigation
              buttonCount={3}
              onPrimaryClick={this.handlePrimaryClick}
              onSecondaryClick={this.handleSecondaryClick}
              onTertiaryClick={this.handleTertiaryClick}
            >
            </Navigation>

            {this.renderCounter()}
            {this.renderControls()}

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

    const classes = [
      'lb-js-carousel__ui',
      'lb-c-carousel__toolbar',
      'lb-c-carousel__toolbar--controls',
      this.state.isShowingControls ? 'lb-js-carousel__toolbar--isVisble' : ''
    ].join(' ');

    return (
      <div className={classes}>
        <Controls {...props} />
      </div>
    );
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

    const classes = [
      'lb-c-carousel__toolbar',
      'lb-c-carousel__toolbar--counter',
      this.state.isShowingControls ? 'lb-js-carousel__toolbar--isVisble' : ''
    ].join(' ');

    return (
      <div className={classes}>
        <Counter label={label} />
      </div>
    );
  }
}

export default Carousel;

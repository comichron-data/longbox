import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './Carousel.css';

import Page from '../page/Page';
import Counter from '../counter/Counter';
import Controls from '../controls/Controls';
import Navigation from '../navigation/Navigation';

class Carousel extends Component {
  static propTypes = {
    currentPageIndex: PropTypes.number.isRequired,
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string,
        preload: PropTypes.bool,
        label: PropTypes.string,
      })
    ).isRequired,
    isShowingControls: PropTypes.bool.isRequired,
    isFullscreen: PropTypes.bool.isRequired,
    onToggleControls: PropTypes.func.isRequired,
    onToggleFullscreen: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onPreviousPage: PropTypes.func.isRequired,
    lazyLoadBufferSize: PropTypes.number
  };

  static defaultProps = {
    lazyLoadBufferSize: 1
  };

  constructor(props) {
    super(props);

    // pre-bind event handlers
    this.handlePageLoad = this.handlePageLoad.bind(this);
    this.handlePrimaryClick = this.handlePrimaryClick.bind(this);
    this.handleSecondaryClick = this.handleSecondaryClick.bind(this);
    this.handleTertiaryClick = this.handleTertiaryClick.bind(this);
    this.handleToggleFullscreen = this.handleToggleFullscreen.bind(this);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const pageChanged = prevState.currentSlideIndex !== this.state.currentSlideIndex;
  //   const preloadsJustFinished = !prevState.preloadsDone && this.state.preloadsDone;
  //
  //   if (preloadsJustFinished) {
  //     console.log('all preloads are done');
  //   }
  //
  //   if (pageChanged || preloadsJustFinished) {
  //     this.lazyLoadLogic();
  //   }
  // }

  handleTertiaryClick() {
    this.props.onToggleControls();
  }

  handlePrimaryClick() {
    this.props.onNextPage();
  }

  handleSecondaryClick() {
    this.props.onPreviousPage();
  }

  scrollToTop() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  render() {
    const styles = {
      width: `${(this.props.pages.length * 100)}vw`, // page count * 100vw
      transform: `translateX(-${this.props.currentPageIndex * 100}vw)` // {-(page number index) * 100vw}
    }

    return (
      <div id="carousel">
        <div className="lb-c-carousel">

          <div className="lb-c-carousel__slide" style={styles}>
            {this.renderPages()}
          </div>

          <div className="lb-c-carousel__ui">

            {this.renderNavigation()}
            {this.renderCounter()}
            {this.renderControls()}

          </div>

        </div>
      </div>
    );
  }

  renderNavigation() {
    const props = {
      buttonCount: 3,
      onPrimaryClick: this.handlePrimaryClick,
      onSecondaryClick: this.handleSecondaryClick,
      onTertiaryClick: this.handleTertiaryClick
    };

    return <Navigation {...props} />;
  }

  renderControls() {
    const props = {
      fullscreen: {
        isFullscreen: this.props.isFullscreen,
        onClick: this.handleToggleFullscreen
      }
    };

    const classes = [
      'lb-js-carousel__ui',
      'lb-c-carousel__toolbar',
      'lb-c-carousel__toolbar--controls',
      this.props.isShowingControls ? 'lb-js-carousel__toolbar--isVisble' : ''
    ].join(' ');

    return (
      <div className={classes}>
        <Controls {...props} />
      </div>
    );
  }

  handleToggleFullscreen() {
    this.props.onToggleFullscreen();
  }

  renderPages() {
    return this.props.pages
      .map(page => {
        return (
          <div key={page.id} className="lb-c-carousel__item">
            <Page
              id={page.id}
              imageUrl={page.url}
              readyToLoad={page.readyToLoad}
              onLoad={this.handlePageLoad}
            />
          </div>
        );
      });
  }

  handlePageLoad(id) {
    console.log(`page ${id} loaded`);

    // const pages = this.state.pages;
    // const index = pages.findIndex(p => p.id === id);
    //
    // if (index !== -1) {
    //   const newPage = Object.assign({}, pages[index], {imageLoaded: true});
    //   const newPages = [
    //     ...pages.slice(0, index),
    //     newPage,
    //     ...pages.slice(index + 1)
    //   ];
    //
    //   const preloaded = newPages.filter(p => p.preload);
    //
    //   this.setState({
    //     pages: newPages,
    //     preloadsDone: preloaded.every(p => p.imageLoaded)
    //   });
    // } else {
    //   throw new Error(`page id not found in pages array: ${id}`);
    // }
  }

  lazyLoadLogic() {
    const start = this.state.currentSlideIndex + 1;
    const end = start + this.props.lazyLoadBufferSize;

    const pages = this.state.pages
      .map((page, index) => {
        if (index >= start && index < end) {
          return Object.assign({}, page, {
            readyToLoad: true
          });
        } else {
          return page;
        }
      });

    // this.setState({
    //   pages
    // });
  }

  getCurrentPageProps() {
    return this.props.pages[this.props.currentPageIndex];
  }

  renderCounter() {
    const {label} = this.getCurrentPageProps();

    const classes = [
      'lb-c-carousel__toolbar',
      'lb-c-carousel__toolbar--counter',
      this.props.isShowingControls ? 'lb-js-carousel__toolbar--isVisble' : ''
    ].join(' ');

    return (
      <div className={classes}>
        <Counter label={label} />
      </div>
    );
  }
}

export default Carousel;

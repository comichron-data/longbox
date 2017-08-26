import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './Carousel.css';

import Page from '../page/Page';
import Counter from '../counter/Counter';
import Controls from '../controls/Controls';
import Navigation from '../navigation/Navigation';
import Spinner from '../spinner/Spinner';

class Carousel extends Component {
  static propTypes = {
    currentPageIndex: PropTypes.number.isRequired,
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string,
        readyToLoad: PropTypes.bool,
        label: PropTypes.string,
      })
    ).isRequired,
    isShowingControls: PropTypes.bool.isRequired,
    isFullscreen: PropTypes.bool.isRequired,
    onToggleControls: PropTypes.func.isRequired,
    onToggleFullscreen: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onPreviousPage: PropTypes.func.isRequired
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
          <div className="lb-c-carousel__spinner lb-c-carousel__spinner--isVisible">
            <Spinner/>
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

  handleTertiaryClick() {
    this.props.onToggleControls();
  }

  handlePrimaryClick() {
    const targetIndex = this.props.currentPageIndex + 1;

    if (this.isValidPageIndex(targetIndex)) {
      this.scrollToTop();
      this.props.onNextPage();
    }
  }

  handleSecondaryClick() {
    const targetIndex = this.props.currentPageIndex - 1;

    if (this.isValidPageIndex(targetIndex)) {
      this.scrollToTop();
      this.props.onPreviousPage();
    }
  }

  isValidPageIndex(index) {
    return index >= 0 && index < this.props.pages.length;
  }

  scrollToTop() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  renderControls() {
    const props = {
      fullscreen: {
        isFullscreen: this.props.isFullscreen,
        onClick: this.handleToggleFullscreen
      },
      shareUrl: this.props.shareUrl,
      tweet: this.props.tweet
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

  handlePageLoad(pageId) {
    this.props.onPageLoad(pageId);
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

  getCurrentPageProps() {
    return this.props.pages[this.props.currentPageIndex];
  }
}

export default Carousel;

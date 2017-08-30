import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import './Carousel.css';

import Page from '../page/Page';
import Counter from '../counter/Counter';
import Controls from '../controls/Controls';
import Navigation from '../navigation/Navigation';
import Spinner from '../spinner/Spinner';

const clientWidth = () => document.documentElement.clientWidth;

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
    // how far user has to swipe to cause page turn, in px
    pageTurnThreshold: PropTypes.number,
    isShowingControls: PropTypes.bool.isRequired,
    onToggleControls: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onPreviousPage: PropTypes.func.isRequired
  };

  static defaultProps = {
    pageTurnThreshold: 50
  };

  constructor(props) {
    super(props);

    this.state = {
      userPushPx: 0,
      viewportWidthPx: clientWidth(),
      swiping: false
    };

    // pre-bind event handlers
    this.handlePageLoad = this.handlePageLoad.bind(this);
    this.handlePrimaryClick = this.handlePrimaryClick.bind(this);
    this.handleSecondaryClick = this.handleSecondaryClick.bind(this);
    this.handleTertiaryClick = this.handleTertiaryClick.bind(this);

    this.handleSwiping = this.handleSwiping.bind(this);
    this.handleSwiped = this.handleSwiped.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.cacheTopLevelElement = this.cacheTopLevelElement.bind(this);
  }

  componentDidMount() {
    window.addEventListener('orientationchange', this.handleResize);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.handleResize);
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({
      viewportWidthPx: clientWidth()
    });
  }

  render() {
    const styles = {
      width: this.totalWidth(),
      transform: `translateX(${this.totalXOffset()})`
    }

    return (
      <div id="carousel" ref={this.cacheTopLevelElement}>
        <div className="lb-c-carousel">

          <div className={this.sliderClasses()} style={styles}>
            {this.renderPages()}
          </div>
          {this.renderSpinner()}
          <div className="lb-c-carousel__ui">

            {this.renderNavigation()}
            {this.renderCounter()}
            {this.renderControls()}

          </div>

        </div>
      </div>
    );
  }

  renderSpinner() {
    const spinner =
      this.getCurrentPageProps().loaded ? null : <Spinner key="spinner" />;

    return (
      <div className="lb-c-carousel__spinner">
        <CSSTransitionGroup
          transitionName="spinner"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
        >
          {spinner}
        </CSSTransitionGroup>
      </div>
    );
  }

  cacheTopLevelElement(element) {
    this._element = element;
  }

  /**
  * @return {String} css unit
  */
  totalXOffset() {
    const currentPageOffset = -this.props.currentPageIndex * 100;
    const userPushOffset = this.pxToVw(this.state.userPushPx);

    return `${currentPageOffset + userPushOffset}vw`;
  }

  pxToVw(px) {
    const width = document.documentElement.clientWidth;
    const pixelsPerVw = width / 100;
    const vw = px / pixelsPerVw;
    return vw;
  }

  /**
  * @return {String} css unit
  */
  totalWidth() {
    return `${this.props.pages.length * 100}vw`;
  }

  sliderClasses() {
    const classes = [
      'lb-c-carousel__slide'
    ];

    if (this.state.swiping) {
      classes.push('lb-c-carousel__slide--swiping');
    }

    return classes.join(' ');
  }

  renderNavigation() {
    const props = {
      onPrimaryClick: this.handlePrimaryClick,
      onSecondaryClick: this.handleSecondaryClick,
      onTertiaryClick: this.handleTertiaryClick,
      onSwiping: this.handleSwiping,
      onSwiped: this.handleSwiped
    };

    return <Navigation {...props} />;
  }

  handleSwiping(deltaX) {
    this.setState({
      userPushPx: deltaX,
      swiping: true
    });
  }

  handleSwiped(deltaX) {
    if (deltaX < -this.props.pageTurnThreshold) {
      this.goToNextPage();
    } else if (deltaX > this.props.pageTurnThreshold) {
      this.goToPreviousPage();
    }

    this.setState({
      userPushPx: 0,
      swiping: false
    });
  }

  handleTertiaryClick() {
    this.props.onToggleControls();
  }

  handlePrimaryClick() {
    const targetIndex = this.props.currentPageIndex + 1;

    if (this.isValidPageIndex(targetIndex)) {
      this.goToNextPage();
    } else {

    }
  }

  handleSecondaryClick() {
    const targetIndex = this.props.currentPageIndex - 1;

    if (this.isValidPageIndex(targetIndex)) {
      this.goToPreviousPage();
    } else {

    }
  }

  goToNextPage() {
    this.scrollToTop();
    this.props.onNextPage();
  }

  goToPreviousPage() {
    this.scrollToTop();
    this.props.onPreviousPage();
  }

  isValidPageIndex(index) {
    return index >= 0 && index < this.props.pages.length;
  }

  scrollToTop() {
    if (this._element) {
      this._element.scrollIntoView();
    }
  }

  renderControls() {
    const classes = [
      'lb-js-carousel__ui',
      'lb-c-carousel__toolbar',
      'lb-c-carousel__toolbar--controls',
      this.props.isShowingControls ? 'lb-js-carousel__toolbar--isVisble' : ''
    ].join(' ');

    return (
      <div className={classes}>
        <Controls />
      </div>
    );
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

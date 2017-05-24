import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {appBarActions} from '../../actions';
import {getPopularMovies} from '../../api/Discover';
import {getMovieGenres} from '../../api/Genres';
import {getPopularShows} from '../../api/Discover';
import {getTVGenres} from '../../api/Genres';
import PopularMovieComponent from '../movie/movieCardsComponent';
import PopularShowComponent from '../tv/tvShowCardsComponent';
import LoadingComponent from '../shared/loadingComponent';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

class PopularComponent extends Component {
  componentWillMount() {
    this.state = {
      slideIndex: 0,
      load: false,
      movieLoaded: false,
      showLoaded: false
    };
    this.props.actions.changeAppBarTitle(null);
    this.props.actions.changeAppBarStyle({ boxShadow: 'none' });

    this.getMovieData();
  }

  componentWillUnmount() {
    this.props.actions.changeAppBarStyle(null);
  }

  getMovieData() {
    Promise.all([getPopularMovies(), getMovieGenres()]).then((data) => {
      let [movies,
        genres] = data;
      this.setState({ movieList: movies });
      this.setState({ movieGenres: genres });
    }).then(() => {
      this.setState({ movieLoaded: true });
    });
  }

  getShowData() {
    Promise.all([getPopularShows(), getTVGenres()]).then((data) => {
      let [shows,
        genres] = data;
      this.setState({ tvShowList: shows });
      this.setState({ tvGenres: genres });
    }).then(() => {
      this.setState({ showLoaded: true });
    });
  }

  handleChange = (value) => {
    this.setState({ slideIndex: value, load: true });
    this.getShowData();
  };

  render() {
    const {
      index,
      slideIndex,
      movieLoaded,
      movieList,
      movieGenres,
      load,
      showLoaded,
      tvShowList,
      tvGenres
    } = this.state;
    return (
      <div>
        <Tabs onChange={this.handleChange} value={index}>
          <Tab label="Movies" value={0}/>
          <Tab label="TV Shows" value={1}/>
        </Tabs>
        <SwipeableViews index={slideIndex} onChangeIndex={this.handleChange}>
          {movieLoaded
            ? <PopularMovieComponent movies={movieList} movieGenres={movieGenres}/>
            : <LoadingComponent/>
          }

          {load && showLoaded
            ? <PopularShowComponent tvShows={tvShowList} tvGenres={tvGenres} movieGenres={movieGenres}/>
            : null
          }
        </SwipeableViews>
      </div>
    );
  }
}

PopularComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  appBarTitle: PropTypes.object
};

function mapStateToProps(state) {
  return {
    appBarTitle: state.appBarTitle,
    appBarStyle: state.appBarStyle
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appBarActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularComponent);

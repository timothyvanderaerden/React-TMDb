import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ImageUrl } from '../../api/ApiUrl';
import backdropImage from '../../resources/images/backdrop_placeholder.png';
import Chip from 'material-ui/Chip';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid/lib/index';

class MovieCardsComponent extends Component {
    constructor(props) {
        super(props);
        this.styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
    }

    _handleClick = (id, name) => {
        this.props.history.push(`/movie/${id}/${name}`);
    };

    render() {
        const {movies, movieGenres} = this.props;

        return (
            <Row style={{margin: 8}}>
                {movies.results.map(movie => {
                    const image = movie.backdrop_path ?
                        `${ImageUrl}w500${movie.backdrop_path}` :
                        backdropImage;
                    return (
                        <Col xs={12} sm={6} md={6} lg={4} key={movie.id} style={{marginBottom: 12}}>
                            <Card>
                                <CardMedia>
                                    <img src={image} style={{cursor: 'pointer'}}
                                         onClick={() => {
                                             this._handleClick(movie.id, movie.original_title);
                                         }}/>
                                </CardMedia>
                                <CardTitle title={movie.original_title} style={{cursor: 'pointer'}}
                                           onTouchTap={() => {
                                               this._handleClick(movie.id, movie.original_title);
                                           }}/>
                                <CardText>
                                    {movie.overview}
                                </CardText>
                                <CardActions>
                                    <div style={this.styles.wrapper}>
                                        {movie.genre_ids.map(id => {
                                            const genre = movieGenres.genres.find(x => x.id === id);
                                            return (
                                                <Chip key={id} style={this.styles.chip}>
                                                    {genre.name}
                                                </Chip>
                                            );
                                        })}
                                    </div>
                                </CardActions>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        );
    }
}

MovieCardsComponent.propTypes = {
  movies: PropTypes.object.isRequired,
  movieGenres: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(MovieCardsComponent);

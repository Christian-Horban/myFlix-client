import PropTypes from "prop-types";
import { Button, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { MovieCard } from "../movie-card/movie-card";
import { useEffect, useState } from "react";

export const MovieView = ({ movies, user, token, updateUser }) => {
  console.log("MOVIES", movies);
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  return (
    <Col md={12}>
      <Card className="d-flex">
        <div className="img-container">
          <Card.Img
            src={movie.image}
            alt="Movie Cover Image"
          />
        </div>
        <div className="movie-info">
          <Card.Body>
            <Card.Title className="text-center">{movie.title}</Card.Title>
            <Card.Title className="text-center">Description:</Card.Title>
            <Card.Text className="text-center">{movie.description}</Card.Text>
            <Card.Subtitle className="text-center">
              Genre: {movie.genre.name}
            </Card.Subtitle>
            <Card.Text className="text-center">
              {movie.genre.description}
            </Card.Text>
            <Card.Subtitle className="text-center">
              Director: {movie.director.name}
            </Card.Subtitle>
            <Card.Text className="text-center">{movie.director.bio}</Card.Text>
            <div className="text-center">
              <Link to={"/"}>
                <Button variant="primary">Back</Button>
              </Link>
            </div>
          </Card.Body>
        </div>
      </Card>
    </Col>
  );
};

MovieView.propTypes = {
  movie: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
      }).isRequired,
      director: PropTypes.shape({
        name: PropTypes.string,
        bio: PropTypes.string,
      }).isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ),
};

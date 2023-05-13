import react from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router";

export const MovieCard = ({ movie }) => {
    return (
        <Card>
          <Card.Img variant="top" src={movie.image} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
            <Link to={`/movies/${encodedURIComponent(movie.id)}`}>
                <Button variant="link">Open</Button>
            </Link>
          </Card.Body>
        </Card>
      );
    };

    MovieCard.PropTypes = {
        movie: PropTypes.shape({
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            director: PropTypes.string
        }).isRequired
    };

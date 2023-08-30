import react from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card>
          <Card.Img variant="top" src={movie.image} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <Button variant="link">Open</Button>
            </Link>
          </Card.Body>
        </Card>
      );
    };

    MovieCard.propTypes = {
        movie: PropTypes.shape({
            title: PropTypes.string.isRequired,
            // image: PropTypes.string.isRequired,
            Director: PropTypes.string
        }).isRequired
    };

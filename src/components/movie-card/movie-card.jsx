import react from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {

  const cardBodyStyle = {
    textAlign: 'center',
  };

  const cardImageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px', // Set the desired height for the image container
  };

  const imageStyle = {
    width: '200px', // Set a fixed width for the images
    height: 'auto', // Maintain aspect ratio
    maxWidth: '100%', // Ensure the image doesn't exceed its container
  };

  const buttonStyle = {
    fontSize: '1.2rem',
  };


    return (
        <Card>
          <div style={cardImageContainerStyle}>
        <Card.Img variant="top" src={movie.image} style={imageStyle} />
      </div>
          <Card.Body style={cardBodyStyle} > 
            <Card.Title>{movie.title}</Card.Title>
            {/* <Card.Text>{movie.description}</Card.Text> */}
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <Button variant="link" style={buttonStyle} >Open</Button>
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

import react from "react";
import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, setUser, token }) => {

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

  const [isFavorite, setIsFavorite] = useState(
    user && movie && user.FavoriteMovies.includes(movie.id)
  );

  useEffect(() => {
    setIsFavorite(user && movie && user.FavoriteMovies.includes(movie.id));
  }, [user, movie]);

  const handleToggleFavorite = async () => {
    if (!user || !movie) return;

    let response;

    if (isFavorite) {
      // Remove the movie from the favorites
      response = await fetch(
        `https://horban-movie-api.herokuapp.com/users/${user.Username}/favoriteMovies/${movie._id}`,
        {
          method: 'DELETE',
          headers: {Authorization: `Bearer ${token}`},
        }
      );
    } else {
      // Add the movie to the favorites
      response = await fetch(
        `https://horban-movie-api.herokuapp.com/users/${user.Username}/favoriteMovies/${movie._id}`,
        {
          method: 'POST',
          headers: {Authorization: `Bearer ${token}`},
        }
      );
    }

    if (response.ok) {
      const userResponse = await response.json();
      setUser(userResponse.user);
      setIsFavorite(
        userResponse.user.FavoriteMovies.some((fm) => fm == movie.id)
      );
    } else {
      console.error('Failed to update favorite movies.');
    }
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
            <Button
          variant={isFavorite ? 'danger' : 'success'}
          size="sm"
          onClick={handleToggleFavorite}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button> 
          </Card.Body>
        </Card>
      );
    };

    MovieCard.propTypes = {
        movie: PropTypes.shape({
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            Director: PropTypes.string
        }).isRequired,
        user: PropTypes.object, 
        setUser: PropTypes.func.isRequired, 
        token: PropTypes.string.isRequired 
    };

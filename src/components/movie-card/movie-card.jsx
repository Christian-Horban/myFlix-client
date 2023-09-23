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
    user && movie && user.FavoriteMovies.includes(movie._id)
  );

  useEffect(() => {
    setIsFavorite(user && movie && user.FavoriteMovies.includes(movie._id));
  }, [user, movie]);

  const handleToggleFavorite = async () => {
    if (!user || !movie) {
      console.log('User or movie is undefined.');
      return;
    }

    if (!user.FavoriteMovies) {
      console.log('FavoriteMovies is undefined in user.');
      return;
    }

    let response;
    

    if (isFavorite) {
      // Remove the movie from the favorites
      response = await fetch(
        `https://horban-movie-api.herokuapp.com/users/${user.Username}/FavoriteMovies/${movie._id}`,
        {
          method: 'DELETE',
          headers: {Authorization: `Bearer ${token}`},
        }
      );
    } else {
      // Add the movie to the favorites
      response = await fetch(
        `https://horban-movie-api.herokuapp.com/users/${user.Username}/FavoriteMovies/${movie._id}`,
        {
          method: 'POST',
          headers: {Authorization: `Bearer ${token}`},
        }
      );
    }

    if (response.ok) {
      const userResponse = await response.json();
console.log('userResponse:', userResponse);
setUser(userResponse.user);

  
      if (userResponse.user.FavoriteMovies) {
        setIsFavorite(
          userResponse.user.FavoriteMovies.some((fm) => fm == movie.id)
        );
      } else {
        console.log('FavoriteMovies is undefined in updated user.');
      }
    } else {
      console.log('Failed to update favorite movies.');
    }
  };

    
    return (
        <Card className="card">
        
          <Card.Img
                variant="top"
                src={movie.image}
                alt="Movie Cover Image"
                className="card-img-container"
                style={{ maxWidth: "100%" }}
              />       
          <Card.Body className='card-body' > 
            <Card.Title className='card-title'>{movie.title} </Card.Title>
            {/* <Card.Text>{movie.description}</Card.Text> */}
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <Button variant="link" className="btn open-button">Open</Button>
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

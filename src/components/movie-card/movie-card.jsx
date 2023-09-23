import react from "react";
import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss"; // Import the SCSS file

export const MovieCard = ({ movie, user, setUser, token }) => {


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
    <Card className="card"> /* Apply the card class */
      <div className="card-img-container"> /* Apply the card-img-container class */
        <Card.Img
          variant="top"
          src={movie.image}
          className="card-img" /* Apply the card-img class */
        />
      </div>
      <Card.Body className="card-body"> /* Apply the card-body class */
        <Card.Title className="card-title">{movie.title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button
            variant="link"
            className="card-button" /* Apply the card-button class */
          >
            Open
          </Button>
        </Link>
        <Button
          variant={isFavorite ? "danger" : "success"}
          size="sm"
          onClick={handleToggleFavorite}
          className={`card-button card-button-${isFavorite ? "danger" : "success"}`} /* Apply the card-button and card-button-{variant} classes */
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};
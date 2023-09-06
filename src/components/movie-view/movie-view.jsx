import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { MovieCard } from "../movie-card/movie-card";
import { useEffect, useState } from "react";

export const MovieView = ({ movies, user, token, updateUser }) => {
    console.log("MOVIES", movies);
    const { movieId } = useParams();
    const movie = movies.find(m => m._id === movieId);
    const [isFavorite, setIsFavorite] = useState(
        user && movie && user.FavoriteMovies.some((fm) => fm == movie.id)
      );
    
      useEffect(() => {
        setIsFavorite(
          user && movie && user.FavoriteMovies.some((fm) => fm == movie.id)
        );
      }, [user, movie]);



      const handleToggleFavorite = () => {
        if (!user || !movie) return;
    
        fetch(
          `https://horban-movie-api.herokuapp.com/users/${user.Username}/favoriteMovies/${movie._id}`,
          {
            method: isFavorite ? 'DELETE' : 'POST',
            headers: {Authorization: `Bearer ${token}`},
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw response;
            }
            return response.json();
          })
          .then((updatedUserResponse) => {
            setUser(updatedUserResponse.user);
            setIsFavorite(
              updatedUserResponse.user.FavoriteMovies.some((fm) => fm == movie.id)
            );
          })
          .catch((error) => {
            const contentType = error.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
              error
                .json()
                .then((errorMessage) =>
                  alert(`An error occurred: ${errorMessage}`)
                );
            } else {
              error.text().then((errorMessage) => alert(errorMessage));
            }
          });
      };

    // const addFavorite = () => {
    //     fetch(`https://horban-movie-api.herokuapp.com/users/${user.username}/movies/${movieId}`, {
    //         method: "POST",
    //         headers: { Authorization: `Bearer ${token}` }
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             alert("Failed");
    //             return false;
    //         }
    //     })
    //     .then(user => {
    //         if (user) {
    //             alert("Successfully added to favorites");
    //             setIsFavorite(true);
    //             updateUser(user);
    //         }
    //     })
    //     .catch(e => {
    //         alert(e);
    //     });
    // }

    // const removeFavorite = () => {
    //     fetch(`https://horban-movie-api.herokuapp.com/users/${user.username}/movies/${movieId}`, {
    //         method: "DELETE",
    //         headers: { Authorization: `Bearer ${token}` }
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             alert("Failed");
    //             return false;
    //         }
    //     })
    //     .then(user => {
    //         if (user) {
    //             alert("Successfully deleted from favorites");
    //             setIsFavorite(false);
    //             updateUser(user);
    //         }
    //     })
    //     .catch(e => {
    //         alert(e);
    //     });
    // }

    return (
        <>
            <Col md={12}>
                <div /*className="text-light"*/>
                    
                    <h2 style={{ textAlign: 'center' }}>{movie.title}</h2>
                    <img
                        style={{
                                display: 'block',
                                margin: '0 auto',
                                width: '100%', // Set the width to 100% for uniform size
                                height: 'auto', // Maintain aspect ratio
                                padding: '3px', // Add 3px padding on all sides
                            }}
                            src={movie.image}
                            alt="Movie Cover Image"
        />
                    <h3 style={{ textAlign: 'center' }}> Description: </h3>
                    <p style={{ textAlign: 'center' }}>{movie.description}</p>
                    <h4 style={{ textAlign: 'center' }}>Genre: {movie.genre.name}</h4>
                    <p style={{ textAlign: 'center' }}>{movie.genre.description}</p>
                    <h4 style={{ textAlign: 'center' }}>Director: {movie.director.name}</h4>
                    <p style={{ textAlign: 'center' }}>{movie.director.bio}</p>
                    <Link to={"/"}>
                        <Button variant="primary">Back</Button>
                    </Link>
                    <Button
                  variant={isFavorite ? 'danger' : 'success'}
                  onClick={handleToggleFavorite}
                  style={{marginTop: '6px', marginLeft: '6px'}}
                >
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
                </div>
            </Col> 
        </>
    );
};

MovieView.propTypes = {
    movie: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string,
          }).isRequired,
        director:  PropTypes.shape({
            name: PropTypes.string,
            bio: PropTypes.string,
          }).isRequired,
        image: PropTypes.string.isRequired
    }).isRequired)
};
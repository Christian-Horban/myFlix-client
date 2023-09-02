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
    const similarMovies = movies.filter(movie => movie.genre === movie.genre ? true : false)

    const [isFavorite, setIsFavorite] = useState(user.FavoriteMovies.includes(movieId));

    useEffect(() => {
        setIsFavorite(user.FavoriteMovies.includes(movieId));
        window.scrollTo(0, 0);
    }, [movieId])

    const addFavorite = () => {
        fetch(`https://horban-movie-api.herokuapp.com/users/${user.username}/movies/${movieId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully added to favorites");
                setIsFavorite(true);
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    const removeFavorite = () => {
        fetch(`https://horban-movie-api.herokuapp.com/users/${user.username}/movies/${movieId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully deleted from favorites");
                setIsFavorite(false);
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

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
                    {isFavorite ? 
                        <Button variant="danger" className="ms-2" onClick={removeFavorite}>Remove from favorites</Button>
                        : <Button variant="success" className="ms-2" onClick={addFavorite}>Add to favorites</Button>
                    }                   
                    <h3 className="mt-3 mb-3 text-light">Similar movies:</h3>
                </div>
            </Col> 
            {/* {similarMovies.map(movie => (
                <Col className="mb-4" key={movieId} xl={2} lg={3} md={4} xs={6}>
                    <MovieCard movie={movie} />
                </Col>
            ))} */}
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
        // image: PropTypes.string.isRequired
    }).isRequired)
};
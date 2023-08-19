import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { MovieCard } from "../movie-card/movie-card";
import { useEffect, useState } from "react";

export const MovieView = ({ movies, user, token, updateUser }) => {
    const { movieId } = useParams();
    const movie = movies.find(m => m.id === movieId);
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
                <div className="text-light">
                    {/* <img className="float-start me-3 mb-2" src={movie.image} alt="Movie Cover Image" /> */}
                    <h2>{movies.Title} ({movies.year})</h2>
                    <p>{movies.Description}</p>
                    <h4>Genre: </h4>
                    <h5>{movies.Genre}</h5>
                    <p>{movies.GenreDescription}</p>
                    <h4>Director: </h4>
                    <h5>{movies.Director} {movies.Directorbirth}</h5>
                    <p>{movies.DirectorBio}</p>
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
            {similarMovies.map(movie => (
                <Col className="mb-4" key={movieId} xl={2} lg={3} md={4} xs={6}>
                    <MovieCard movie={movie} />
                </Col>
            ))}
        </>
    );
};

MovieView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        // image: PropTypes.string.isRequired
    }).isRequired)
};
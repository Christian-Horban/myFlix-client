import { useState } from "react";
import { useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../Signup-View/SignupView";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] =useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }
        
        fetch("https://git.heroku.com/horban-movie-api.git/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
    }, [token]);

    return (
        <BrowserRouter>
          <Row className="justify-content-md-center">
            <Routes>
              <Route
                path="/signup"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <SignupView />
                      </Col>
                    )}
                  </>
    
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <LoginView onLoggedIn={(user) => setUser(user)} />
                      </Col>
                    )}
                  </>
    
                }
              />
              <Route
                path="/movies/:movieId"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <Col md={8}>
                        <MovieView movies={movies} />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <>
                        {movies.map((movie) => (
                          <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))}
                      </>
                    )}
                  </>
                }
              />
            </Routes>
          </Row>
        </BrowserRouter>
      );
    };





// return (
//     <Row>
//         {!user ? ( 
//             <>
//             <LoginView onLoggedIn={(user) => setUser(user)} />
//             or 
//             <SignupView />
//             </>
//         ) :selectedMovie ? (
//             <MovieView
//             movie={selectedMovie}
//             onBackClick={() => setSelectedMovie(null)}
//             />
        
//         ) : movies.length === 0 ? (
//     <div>The list is empty!</div>
// ) : (
//     <>
//     {movies.map((movie) => (
//         <MovieCard
//         key={movie.id}
//         movie={movie}
//         onMovieClick={(newSelectedMovie) => {
//             selectedMovie(newSelectedMovie);
//         }}
//         />
//       ))}
//     </>
//   )}
// </Row>
// );
// };

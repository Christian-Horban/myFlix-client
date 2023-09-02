import { useState } from "react";
import { useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../Signup-View/SignupView";
import { NavigationBar } from "../navigation-bar/navigation-bar"
import { ProfileView } from "../profile-view/profile-view";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [token, setToken] =useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([])
    const [loggedIn, setLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const onLoggedOut = () => {
      setUser(null);
      setToken(null);
      localStorage.clear();
    };

    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        if (!token) {
            return;
        }
        
        fetch("https://horban-movie-api.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => ({
              _id: movie._id,
              title: movie.Title,
              description: movie.Description,
              // imagePath: movie.imagePath,
              genre: {
                name: movie.Genre.Name,
                description: movie.Genre.Description,
              },
              director: {
                name: movie.Director.Name,
                bio: movie.Director.Bio,
              },
              image:movie.ImagePath
              //releaseYear: movie.releaseYear,
            }));
            setMovies(moviesFromApi);
          });
        }, [token, loggedIn]);

        useEffect(() => {
          const filteredMovies = movies.filter((movie) => {
            console.log("Here", movie);
            return movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        });
          setFilteredMovies(filteredMovies);
        }, [movies, searchTerm]);

        const updateUserFavorites = (movieId, action) => {
          if (action === 'add') {
            setUser({ ...user, favorites: [...user.favorites, movieId] });
          } else if (action === 'remove') {
            setUser({
              ...user,
              favorites: user.favorites.filter((id) => {
                return id !== movieId;
              }),
            });
          }
        };
      
        return (
          <BrowserRouter>
            <NavigationBar
              user={user}
              onLoggedOut={onLoggedOut}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Container>
              <div style={{ marginTop: '0px', padding: '45px' }}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      user ? (
                        filteredMovies.length !== 0 ? (
                          <Row className="justify-content-center">
                            {filteredMovies.map((movie) => (
                              <Col
                                xs={12}
                                sm={6}
                                md={4}
                                key={movie._id}
                                className="mb-4 movie-col"
                                style={{
                                  paddingTop: '55px',
                                }}
                              >
                                <MovieCard movie={movie} />
                              </Col>
                            ))}
                          </Row>
                        ) : (
                          <Row>
                            <Col>The list is empty!</Col>
                          </Row>
                        )
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <>
                        {user ? (
                          <Navigate to="/" />
                        ) : (
                          <Col md={12}>
                            <LoginView
                              onLoggedIn={(user, token) => {
                                setUser(user);
                                setToken(token);
                                setLoggedIn(true);
                              }}
                            />
                          </Col>
                        )}
                      </>
                    }
                  />
                  <Route path="/signup" element={<SignupView />} />
                  <Route
                    path="/movies/:movieId"
                    element={
                      user ? (
                        <Row className="justify-content-center">
                          <Col md={12} className="mt-3">
                            <MovieView
                              movies={movies}
                              user={user}
                              updateUserFavorites={updateUserFavorites}
                            />
                          </Col>
                        </Row>
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/users/:username"
                    element={
                      user ? (
                        <Row className="justify-content-center">
                          <Col md={12} className="mt-3">
                            <ProfileView
                              user={user}
                              movies={movies}
                              setMovies={setMovies}
                              setUser={setUser}
                              onLoggedOut={onLoggedOut}
                              updateUserFavorites={updateUserFavorites}
                            />
                          </Col>
                        </Row>
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                </Routes>
              </div>
            </Container>
          </BrowserRouter>
        );
      };
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
import { Container, Form, InputGroup, Nav } from "react-bootstrap";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [token, setToken] =useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([])
    const [loggedIn, setLoggedIn] = useState(false);
    const [Search, setSearch] = useState("");

    const onLoggedOut = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
      localStorage.clear();
    };

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
              genre: {
                name: movie.Genre.Name,
                description: movie.Genre.Description,
              },
              director: {
                name: movie.Director.Name,
                bio: movie.Director.Bio,
              },
              image:movie.ImagePath
            }));
            setMovies(moviesFromApi);
          });
        }, [token, loggedIn]);

      
        return (
          <BrowserRouter>
            <NavigationBar
              user={user}
              onLoggedOut={onLoggedOut}
              />
              <Row
                className="jusify-content-md-center">
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
                            <LoginView
                            onLoggedIn={(user, token) => {
                              setUser(user);
                              setToken(token);
                            }}
                            />
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
                        <Col> The list is empty!</Col>
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
                      ) :
                      movies.length === 0 ? (
                        <Col> The list is empty!</Col>
                      ) : (
                        <>
                        <Row className="my-3">
                          <form>
                            <InputGroup>
                            <Form.Control
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Movie Titles"
                            aria-label="Search Movie Titles"
                            />
                            </InputGroup>
                          </form>
                         </Row>
                         {movies.filter((movie) => {
                          return Search === "" ?
                          movie :
                          movie.title.toLowerCase().includes(Search.toLowerCase());
                         }

                         ).map((movie) => (

                          <Col className="mb-4" key={movie._id} md={3}>
                            <MovieCard
                            movie={movie}
                            token={token}
                            user={user}
                            setUser={setUser}
                            />

                          </Col>

                         ))}

                          </>
                      )
                    }
                  </>
                }
              /> 

             <Route
             path="/profile"
             element={
              <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView
                  user={user}
                  token={token}
                  setUser={setUser}
                  movies={movies}
                  onLoggedOut={onLoggedOut}
                  />
                </Col>
              )}
              </>
             }
            />

            <Route
            path="/users/:username"
            element={
              <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView
                  movies={movies}
                  setUser={setUser}
                  />
                </Col>
              )}
              </>
            }
          />


                  </Routes>
                </Row>
              </BrowserRouter>
        )
      };
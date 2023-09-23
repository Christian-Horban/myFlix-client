import { useState, useEffect } from "react";
import { Card, Col, Form, Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./profile-view.scss"; // Import the SCSS file

export const ProfileView = ({
  user,
  token,
  movies,
  onLoggedOut,
  updateUser,
}) => {
  const [Username, setUsername] = useState(user.Username); // Initialize with user's username
  const [Password, setPassword] = useState(""); // Keep password field empty for security
  const [email, setEmail] = useState(user.Email); // Initialize with user's email
  const [birthdate, setBirthdate] = useState(
    user.Birthday ? user.Birthday.slice(0, 10) : ""
  ); // Initialize with user's birthdate or empty string
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Fetch user's data, including favorite movies, when the component mounts
    fetch(`https://horban-movie-api.herokuapp.com/users/${user.Username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        return response.json();
      })
      .then((userData) => {
        // Extract favoriteMovies from userData
        if (userData.FavoriteMovies) {
          // Fetch all movies
          fetch(`https://horban-movie-api.herokuapp.com/movies`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to fetch movies.");
              }
              return response.json();
            })
            .then((allMovies) => {
              // Filter movies that match favoriteMovie IDs
              const favoriteMovieDetails = allMovies.filter((movie) =>
                userData.FavoriteMovies.includes(movie._id)
              );
              // Update the favoriteMovies array with movie details
              setFavoriteMovies(favoriteMovieDetails);
            })
            .catch((error) => {
              console.error("Error fetching movies:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user.Username, token]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username,
      Password, // You can omit this field if you don't want to change the password
      Email: email,
      Birthday: birthdate,
    };

    fetch(`https://horban-movie-api.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Updating user data failed:", response.statusText);
          alert("Changing userdata failed");
          return false;
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          console.log("User data updated successfully:", updatedUser);
          alert("Successfully changed userdata");
          //   updateUser(updatedUser); // Invoke updateUser function with updated user data
        }
      })
      .catch((e) => {
        console.error("Error updating user data:", e);
        alert(e);
      });
  };

  const deleteAccount = () => {
    fetch(`https://horban-movie-api.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          alert("Your account has been deleted. Good Bye!");
          onLoggedOut();
        } else {
          console.error("Deleting account failed:", response.statusText);
          alert("Could not delete account");
        }
      })
      .catch((e) => {
        console.error("Error deleting account:", e);
        alert(e);
      });
  };

  return (
    <div className="profile-container">
      <Col md={6}>
        <Card className="profile-card">
          <Card.Body>
            <Card.Title>Update your info</Card.Title>
            <Form onSubmit={handleSubmit} className="profile-form">
              {/* Form content */}
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Container>
        <h3>Your favorite movies:</h3>
        <Row>
          {/* Favorite movies content */}
        </Row>
      </Container>

      <Col md={6}>
        <Card className="profile-card">
          <Card.Body>
            <Card.Title>Your info</Card.Title>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <p>Birthdate: {user.Birthday.slice(0, 10)}</p>
          </Card.Body>
        </Card>
        <Button
          variant="danger"
          onClick={() => {
            if (confirm("Are you sure?")) {
              deleteAccount();
            }
          }}
          className="profile-button"
        >
          Delete user account
        </Button>
      </Col>
    </div>
  );
};

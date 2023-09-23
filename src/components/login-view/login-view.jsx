import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Col,
  Row,
  Container,
  Card,
  CardGroup,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./login-view.scss"; // Import the SCSS file

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://horban-movie-api.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    //     <Form onSubmit={handleSubmit} className="login-form">
    //       <Form.Group controlId="formUsername">
    //         <Form.Label style={{ fontWeight: "bold", padding: "3px" }}>
    //           Username:
    //         </Form.Label>
    //         <Form.Control
    //           type="text"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           required
    //           minLength="3"
    //         />
    //       </Form.Group>
    //       <br />
    //       <Form.Group controlId="formPassword">
    //         <Form.Label style={{ fontWeight: "bold", padding: "3px" }}>
    //           Password:
    //         </Form.Label>
    //         <Form.Control
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </Form.Group>
    //       <br />
    //       <Button variant="primary" type="submit">
    //         Submit
    //       </Button>

    //       <div className="mt-3">
    //         <p style={{ fontWeight: "bold", padding: "3px", textAlign: "center" }}>
    //           Not a member yet?{" "}
    //           <Link
    //             style={{ fontWeight: "bold", padding: "3px", textAlign: "center" }}
    //             to="/signup"
    //           >
    //             Sign up!
    //           </Link>
    //         </p>
    //       </div>
    //     </Form>
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form onSubmit={handleSubmit} className="login-form">
                  <FormGroup className="mb=3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <FormControl
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength="3"
                    />
                    <Form.Text className="text-muted">
                      We will never share your email with anyone else.
                    </Form.Text>
                  </FormGroup>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <div className="mt-3">
                    <p
                      style={{
                        fontWeight: "bold",
                        padding: "3px",
                        textAlign: "center",
                      }}
                    >
                      Not a member yet?{" "}
                      <Link
                        style={{
                          fontWeight: "bold",
                          padding: "3px",
                          textAlign: "center",
                        }}
                        to="/signup"
                      >
                        Sign up!
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};

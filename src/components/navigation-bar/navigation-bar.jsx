import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { NavDropdown } from "react-bootstrap";
import "navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Nav className="me-auto">
          {!user && (
            <>
              <Navbar.Brand as={Link} to="/">
                Marvel Flix
              </Navbar.Brand>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            </>
          )}
          {user && (
            <>
              <NavDropdown title="Marvel Flix" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/">
                  Home
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={onLoggedOut}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

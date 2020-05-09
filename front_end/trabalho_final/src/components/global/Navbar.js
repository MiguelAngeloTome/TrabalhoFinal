import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import AuthContext from "../../configs/authContext";

export default class NavbarComponent extends React.Component {
  static contextType = AuthContext;
  render() {
    const { user, logout } = this.context;
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} exact to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about">
                about
              </Nav.Link>
              {user && (
                <Nav.Link as={NavLink} to="/data">
                  data
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {user ? (
                <NavDropdown title={user.username} alignRight>
                  <NavDropdown.Item>{user.id}</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
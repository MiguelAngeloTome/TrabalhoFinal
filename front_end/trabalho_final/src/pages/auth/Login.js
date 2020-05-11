import React from "react";
import services from "../../services";
import { Form, Button, Card } from "react-bootstrap";
import AuthContext from "../../configs/authContext";
import "./auth.css";

export default class LoginPage extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = { username: "admin", password: "123qweASD" };
  }

  handleSubmit(evt) {
    evt.preventDefault();
    services.auth
      .login(this.state)
      .then((data) => {
        this.context.login({ username: this.state.username, ...data });
        this.props.history.push("/");
      })
      .catch((err) => { });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div id="auth-board">
        <Card style={{
          width: "18rem", border: "none",
          boxShadow: "none"
        }}>
          <Form onSubmit={(evt) => this.handleSubmit(evt)}>
            <Card.Body>
              <Card.Title>Login</Card.Title>

              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control value={username} onChange={(evt) => this.setState({ username: evt.target.value })} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(evt) => this.setState({ password: evt.target.value })}
                />
              </Form.Group>

              <Button variant="primary" type="submit" block>
                Login
              </Button>
            </Card.Body>
          </Form>
        </Card>
      </div>
    );
  }
}
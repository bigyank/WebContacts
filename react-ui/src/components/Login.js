import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";

import contactService from "../services/contacts";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loginHandler = async (event) => {
    event.preventDefault();
    setUsername("");
    setPassword("");

    try {
      const user = await contactService.login({ username, password });
      setUser(user);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleDismiss = () => {
    setError(null);
  };

  return (
    <div>
      <Form onSubmit={loginHandler}>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Field>
        <Button type="submit">Login</Button>
      </Form>
      {error && (
        <Message
          error
          onDismiss={handleDismiss}
          header="Invalid Request"
          content={error}
        />
      )}
    </div>
  );
};

export default Login;

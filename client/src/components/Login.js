import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Heading,
  Pane,
  Text,
  TextInputField,
  majorScale,
} from 'evergreen-ui';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        'http://localhost:5000/authentication/login',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken);
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginX={majorScale(2)}
        marginY={majorScale(2)}
      >
        <Link to="/dashboard">
          <Heading size={800} textDecoration="none">
            freelo
          </Heading>
        </Link>

        <Heading size={600}>Login</Heading>

        <Pane>
          <Button>
            <Link to="/register">Register</Link>
          </Button>
        </Pane>
      </Pane>

      <Pane display="flex" alignItems="center" justifyContent="center">
        <form onSubmit={onSubmitForm}>
          <Pane>
            <TextInputField
              label="Email"
              // required
              // description="This is a description."
              type="text"
              name="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </Pane>

          <Pane>
            <TextInputField
              label="Password"
              // required
              // description="This is a description."
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </Pane>

          <Button type="submit">Login</Button>
        </form>
      </Pane>

      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        // marginX={majorScale(2)}
        marginY={majorScale(2)}
      >
        <Pane>
          <Text>Don't have an account?</Text>

          <Button appearance="minimal">
            <Link to="/register">Register</Link>
          </Button>
        </Pane>
      </Pane>
    </Fragment>
  );
};

export default Login;

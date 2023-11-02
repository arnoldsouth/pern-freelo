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

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { email, password, name } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        'http://localhost:5000/authentication/register',
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

        <Heading size={600}>Register</Heading>

        <Pane>
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        </Pane>
      </Pane>

      <Pane display="flex" alignItems="center" justifyContent="center">
        <form onSubmit={onSubmitForm}>
          <Pane>
            <TextInputField
              label="Name"
              required
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => onChange(e)}
            />
          </Pane>

          <Pane>
            <TextInputField
              label="Email address"
              required
              type="text"
              name="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </Pane>

          <Pane>
            <TextInputField
              label="Password"
              required
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </Pane>

          <Button type="submit">Register</Button>
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
          <Text>Already have an account?</Text>

          <Button appearance="minimal">
            <Link to="/login">
              <Text textDecoration="none">Login</Text>
            </Link>
          </Button>
        </Pane>
      </Pane>
    </Fragment>
  );
};

export default Register;

import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

// import { toast } from 'react-toastify';

import { Button, Pane, Text, TextInputField, majorScale } from 'evergreen-ui';

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
        // toast.success('Logging in');
      } else {
        setAuth(false);
        // toast.error(parseRes);
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
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          // marginX={majorScale(2)}
          // marginY={majorScale(2)}
        >
          <Link to="/">freelo</Link>
        </Pane>

        <Text>Login</Text>
      </Pane>

      <Pane
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        // marginX={majorScale(2)}
        // marginY={majorScale(2)}
      >
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          // marginX={majorScale(2)}
          // marginY={majorScale(2)}
        >
          <form onSubmit={onSubmitForm}>
            <Pane
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginX={majorScale(2)}
              // marginY={majorScale(2)}
            >
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

            <Pane
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginX={majorScale(2)}
              // marginY={majorScale(2)}
            >
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

            <Button type="submit" marginX={majorScale(2)}>
              Login
            </Button>

            <Pane
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginX={majorScale(1)}
              // marginY={majorScale(2)}
            >
              <Text marginX={majorScale(1)} marginY={majorScale(2)}>
                Don't have an account?
              </Text>

              <Button>
                <Link to="/register" className="btn btn-outline-primary">
                  Register
                </Link>
              </Button>
            </Pane>
          </form>
        </Pane>
      </Pane>
    </Fragment>
  );
};

export default Login;

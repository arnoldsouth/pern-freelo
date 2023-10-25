import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

// import { toast } from 'react-toastify';

import { Button, Pane, Text, TextInputField, majorScale } from 'evergreen-ui';

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
        // toast.success('Registered');
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

        <Text>Register</Text>
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
                label="Name"
                required
                type="text"
                name="name"
                placeholder="Name"
                value={name}
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
                label="Email address"
                required
                type="text"
                name="email"
                placeholder="name@example.com"
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
                required
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Pane>

            <Button type="submit" marginX={majorScale(2)}>
              Register
            </Button>

            <Pane
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginX={majorScale(1)}
              // marginY={majorScale(2)}
            >
              <Text marginX={majorScale(1)} marginY={majorScale(2)}>
                Already have an account?
              </Text>

              <Button>
                <Link to="/login" className="btn btn-outline-primary">
                  Login
                </Link>
              </Button>
            </Pane>
          </form>
        </Pane>
      </Pane>
    </Fragment>
  );
};

export default Register;

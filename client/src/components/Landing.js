import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { Button, Pane, majorScale } from 'evergreen-ui';

const Landing = () => {
  return (
    <Fragment>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginX={majorScale(2)}
        marginY={majorScale(2)}
      >
        <Pane display="flex" alignItems="center" justifyContent="space-between">
          <Link to="/dashboard">freelo</Link>
        </Pane>

        <Pane display="flex" alignItems="center" justifyContent="space-between">
          <Button marginX={majorScale(2)}>
            <Link to="/login">Login</Link>
          </Button>

          <Button>
            <Link to="/register">Register</Link>
          </Button>
        </Pane>
      </Pane>
    </Fragment>
  );
};

export default Landing;

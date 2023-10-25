import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Button, Pane, Text, majorScale } from 'evergreen-ui';

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
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          // marginX={majorScale(2)}
          // marginY={majorScale(2)}
        >
          <Link href="/">freelo</Link>
        </Pane>

        <Pane
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          // marginX={majorScale(2)}
          // marginY={majorScale(2)}
        >
          <Button marginX={majorScale(2)}>
            <Link to="/login">Login</Link>
          </Button>

          <Button>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </Button>
        </Pane>
      </Pane>
    </Fragment>
  );
};

export default Landing;

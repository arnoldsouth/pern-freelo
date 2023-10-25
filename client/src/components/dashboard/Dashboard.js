import { Button, Pane, Text, majorScale } from 'evergreen-ui';

import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');

  const getProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();

      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();

    try {
      localStorage.removeItem('token');
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Fragment>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginX={majorScale(2)}
        marginY={majorScale(2)}
      >
        <Link to="/dashboard">freelo</Link>

        <Text>Dashboard</Text>
        <Pane>
          <Text marginX={majorScale(2)}>{name}</Text>

          <Button onClick={(e) => logout(e)}>Logout</Button>
        </Pane>
      </Pane>
    </Fragment>
  );
};

export default Dashboard;

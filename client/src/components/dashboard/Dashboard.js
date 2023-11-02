import {
  Button,
  CogIcon,
  Heading,
  LogOutIcon,
  Menu,
  Pane,
  Popover,
  Position,
  Text,
  majorScale,
} from 'evergreen-ui';

import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');

  const getProfile = async () => {
    try {
      // const res = await fetch('http://localhost:5000/dashboard', {
      //   method: 'GET',
      //   headers: { jwt_token: localStorage.token },
      // });

      const res = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);

      setName(parseData);

      // setName(parseData[0].user_name);
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
        <Link to="/dashboard">
          <Heading size={800} textDecoration="none">
            freelo
          </Heading>
        </Link>

        <Heading size={600}>Dashboard</Heading>

        <Pane>
          {/* <Text marginX={majorScale(2)}>{name}</Text> */}
          {/* <Button onClick={(e) => logout(e)}>Logout</Button> */}

          <Popover
            position={Position.BOTTOM_LEFT}
            content={
              <Menu>
                <Menu.Group title="Actions">
                  <Menu.Item disabled icon={CogIcon}>
                    Settings
                  </Menu.Item>
                  {/* <Menu.Item icon={CircleArrowRightIcon}>Move...</Menu.Item>
                  <Menu.Item icon={EditIcon} secondaryText="⌘R">
                    Rename...
                  </Menu.Item> */}
                </Menu.Group>
                <Menu.Divider />
                <Menu.Group title="Logout">
                  <Menu.Item
                    icon={LogOutIcon}
                    intent="danger"
                    onClick={(e) => logout(e)}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Group>
              </Menu>
            }
          >
            <Button marginRight={16}>{name}</Button>
          </Popover>
        </Pane>
      </Pane>
    </Fragment>
  );
};

export default Dashboard;

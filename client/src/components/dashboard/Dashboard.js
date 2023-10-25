import { Button, Pane, Text, majorScale } from 'evergreen-ui';

import React, { Fragment, useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

// import InputTodo from './todolist/InputTodo';
// import ListTodos from './todolist/ListTodos';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');
  // const [allTodos, setAllTodos] = useState([]);
  // const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();

      // setAllTodos(parseData);

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
      // toast.success('Logged out');
    } catch (err) {
      console.error(err.message);
    }
  };

  // useEffect(() => {
  //   getProfile();
  //   setTodosChange(false);
  // }, [todosChange]);

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
        <Text>{name}'s Dashboard</Text>

        <Button onClick={(e) => logout(e)}>Logout</Button>

        {/* <InputTodo setTodosChange={setTodosChange} /> */}
        {/* <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} /> */}
      </Pane>
    </Fragment>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { register } from 'services/authService';
import { UserInterface } from 'models/userTypes';
import { createUseStyles } from 'react-jss';
import { Button, Grid, TextField } from '@material-ui/core';

const emptyUser: UserInterface = {
  id: '',
  position: '',
  name: '',
  password: '',
  surname: '',
  username: '',
  email: ''
};

const useStyles = createUseStyles({
  formHolder: {
    margin: '100px 0',
    padding: '30px 40px',
    border: '1px solid #e3e3e3',
    borderRadius: '10px',
    width: '20%'
  },
  fieldStyle: {
    marginBottom: '15px !important',
    width: '100%'
  },
  formTitle: {
    color: '#014A7C',
    textAlign: 'center'
  },
  formButton: {
    width: '100%',
    backgroundColor: '#C63C96 !important',
    marginBottom: '30px !important'
  }
});

const Register = () => {
  const [user, setUser] = useState<UserInterface>(emptyUser);
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value;
    setUser({
      ...user,
      username
    });
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setUser({
      ...user,
      email
    });
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setUser({
      ...user,
      name
    });
  };

  const onChangeSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
    const surname = event.target.value;
    setUser({
      ...user,
      surname
    });
  };

  const onChangePosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    const position = event.target.value;
    setUser({
      ...user,
      position
    });
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setUser({
      ...user,
      password
    });
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register(user)
      .then((response) => {
        console.log('successful registration', response.data);
      })
      .catch((e) => {
        const status = e.status;
        if (status === '401') {
          console.log('Unauthorized');
        }
        if (status === '400') {
          console.log(e.response);
        }
        setMessage(e.response.data.message);
        console.log(e.response);
      });
  };

  return (
    <Grid container direction={'row'} justify={'center'} alignItems={'center'} className="">
      <div className={classes.formHolder}>
        <h3 className={classes.formTitle}>Sign up</h3>
        <form onSubmit={handleRegister}>
          <div>
            <div>
              <TextField
                type="text"
                variant={'filled'}
                className={classes.fieldStyle}
                name="username"
                label="Username"
                value={user.username}
                onChange={onChangeUsername}
              />
            </div>
            <div>
              <TextField
                type="text"
                name="email"
                variant={'filled'}
                className={classes.fieldStyle}
                label="Email"
                value={user.email}
                onChange={onChangeEmail}
              />
            </div>
            <div>
              <TextField
                type="text"
                name="name"
                variant={'filled'}
                className={classes.fieldStyle}
                label="Name"
                value={user.name}
                onChange={onChangeName}
              />
            </div>
            <div>
              <TextField
                type="text"
                name="surname"
                variant={'filled'}
                className={classes.fieldStyle}
                label="Surname"
                value={user.surname}
                onChange={onChangeSurname}
              />
            </div>
            <div>
              <TextField
                type="text"
                variant={'filled'}
                className={classes.fieldStyle}
                name="position"
                label="Position"
                value={user.position}
                onChange={onChangePosition}
              />
            </div>
            <div>
              <TextField
                type="password"
                name="password"
                variant={'filled'}
                className={classes.fieldStyle}
                label="Password"
                value={user.password}
                onChange={onChangePassword}
              />
            </div>
            <div>
              <Button type="submit" variant={'contained'} size={'large'} className={classes.formButton}>
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div>{message}</div>
    </Grid>
  );
};

export default Register;

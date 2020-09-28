import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from 'services/authService';
import { createUseStyles } from 'react-jss';
import { Button, Grid, TextField } from '@material-ui/core';

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

const Login = () => {
  const form = useRef<HTMLFormElement>(null);
  const history = useHistory();
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value;
    setUsername(username);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPassword(password);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(username, password).then(
      (response) => {
        console.log(response);
        history.push('/home');
      },
      (error) => {
        console.log(error.message);
      }
    );
  };

  return (
    <Grid container direction={'row'} justify={'center'} alignItems={'center'} className="">
      <div className={classes.formHolder}>
        <h3 className={classes.formTitle}>Sign in</h3>
        <form onSubmit={handleLogin} ref={form}>
          <div className="">
            <TextField
              variant={'filled'}
              type="text"
              className={classes.fieldStyle}
              name="username"
              label="Username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>

          <div className="">
            <TextField
              variant={'filled'}
              type="password"
              className={classes.fieldStyle}
              name="password"
              label={'Password'}
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="">
            <Button type="submit" variant={'contained'} size={'large'} className={classes.formButton}>
              <span>Sign in</span>
            </Button>
          </div>
        </form>
      </div>
    </Grid>
  );
};

export default Login;

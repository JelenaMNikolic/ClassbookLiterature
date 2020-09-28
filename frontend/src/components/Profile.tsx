import React, { useEffect, useState } from 'react';
import { getCurrentUser, getCurrentUserFromDB } from 'services/authService';
import { UserInterface } from 'models/userTypes';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import { createUseStyles } from 'react-jss';

const emptyUser = {
  email: '',
  id: '',
  name: '',
  password: '',
  position: '',
  surname: '',
  username: ''
};

const useStyles = createUseStyles({
  headerStyle: {
    backgroundColor: '#dcdcdc',
    '& h4': {
      letterSpacing: '1px',
      fontWeight: '400'
    }
  },
  formUpdateButton: {
    width: '100%',
    backgroundColor: '#FDB94D !important',
    marginBottom: '10px !important'
  }
});

const Profile = () => {
  const userFromLocal = getCurrentUser();
  const [currentUser, setCurrentUser] = useState<UserInterface>(emptyUser);
  const classes = useStyles();

  useEffect(() => {
    getUser(userFromLocal.id);
  }, [userFromLocal.id]);

  const getUser = (id: string) => {
    getCurrentUserFromDB(id)
      .then((response) => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="">
      <Grid container direction={'row'} justify={'center'} alignItems={'center'} className={classes.headerStyle}>
        <h4>
          <strong>{currentUser.username}</strong> profile
        </h4>
      </Grid>
      <Grid container direction={'column'} justify={'center'} alignItems={'center'}>
        <p>
          <strong>Name:</strong> {currentUser.name}
        </p>
        <p>
          <strong>Surname:</strong> {currentUser.surname}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Position:</strong> {currentUser.position}
        </p>
        <div>
          <Link to={'/users/' + userFromLocal.id} className="">
            <Button type="submit" variant={'contained'} size={'large'} className={classes.formUpdateButton}>
              Edit
            </Button>
          </Link>
        </div>
      </Grid>
    </div>
  );
};

export default Profile;

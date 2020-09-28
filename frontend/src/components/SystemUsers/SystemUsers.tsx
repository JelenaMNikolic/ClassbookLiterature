import React, { useEffect, useState } from 'react';
import { UserInterface } from 'models/userTypes';
import { RouteComponentProps } from 'react-router-dom';
import { getCurrentUser, getCurrentUserFromDB } from 'services/authService';
import { update } from 'services/userService';
import { createUseStyles } from 'react-jss';
import { Button, Grid, TextField } from '@material-ui/core';

const emptyUser: UserInterface = {
  id: '',
  email: '',
  name: '',
  password: '',
  position: '',
  surname: '',
  username: ''
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
  formUpdateButton: {
    width: '100%',
    backgroundColor: '#FDB94D !important',
    marginBottom: '10px !important'
  },
  formButton: {
    width: '100%',
    backgroundColor: '#C63C96 !important',
    marginBottom: '30px !important'
  },
  yesButton: {
    width: '95%',
    borderColor: '#C63C96 !important',
    marginBottom: '30px !important'
  },
  noButton: {
    width: '95%',
    borderColor: '#014A7C !important',
    marginBottom: '30px !important'
  }
});

const SystemUser: React.FC<RouteComponentProps<any>> = ({ match }) => {
  const [currentUser, setCurrentUser] = useState<UserInterface>(emptyUser);
  const [userId, setUserId] = useState(true);
  const [localUser, setLocalUser] = useState<UserInterface>(emptyUser);
  const [message, setMessage] = useState('');
  const classes = useStyles();

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

  const compareIds = (id: string, paramId: string) => {
    if (id == paramId) {
      setUserId(true);
    } else {
      setUserId(false);
    }
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setLocalUser(user);
    }
    compareIds(localUser.id, match.params.id);
    console.log(currentUser.id);
    console.log(match.params.id);
  }, [match.params.id, currentUser.id]);

  useEffect(() => {
    getUser(match.params.id);
  }, [match.params.id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateUser = () => {
    update(currentUser.id, currentUser)
      .then((response) => {
        console.log(response.data);
        setMessage('The user was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Grid container direction={'column'} justify={'center'} alignItems={'center'}>
      {userId ? (
        <Grid container direction={'column'} justify={'center'} alignItems={'center'}>
          {currentUser ? (
            <div className={classes.formHolder}>
              <h3 className={classes.formTitle}>User</h3>
              <form>
                <div className="">
                  <TextField
                    type="text"
                    className={classes.fieldStyle}
                    label={'Name'}
                    variant="filled"
                    id="name"
                    name="name"
                    value={currentUser.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="">
                  <TextField
                    type="text"
                    className={classes.fieldStyle}
                    label={'Surname'}
                    variant="filled"
                    id="surname"
                    name="surname"
                    value={currentUser.surname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="">
                  <TextField
                    type="text"
                    className={classes.fieldStyle}
                    label={'Position'}
                    variant="filled"
                    id="position"
                    name="position"
                    value={currentUser.position}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="">
                  <TextField
                    type="text"
                    className={classes.fieldStyle}
                    label={'Username'}
                    variant="filled"
                    id="username"
                    name="username"
                    value={currentUser.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="">
                  <TextField
                    type="text"
                    className={classes.fieldStyle}
                    label={'Email'}
                    variant="filled"
                    id="email"
                    name="email"
                    value={currentUser.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="">
                  <TextField
                    type="password"
                    className={classes.fieldStyle}
                    label={'Password'}
                    variant="filled"
                    id="password"
                    name="password"
                    defaultValue=""
                    onChange={handleInputChange}
                  />
                </div>
              </form>
              <Button
                type="submit"
                variant={'contained'}
                size={'large'}
                className={classes.formUpdateButton}
                onClick={updateUser}
              >
                Update
              </Button>
              <p>{message}</p>
            </div>
          ) : (
            <div>
              <br />
            </div>
          )}
        </Grid>
      ) : (
        <div> You don't have access to this user's data.</div>
      )}
    </Grid>
  );
};

export default SystemUser;

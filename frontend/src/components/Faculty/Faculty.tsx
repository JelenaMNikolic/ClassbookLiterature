import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { get, remove, update } from 'services/facultyService';
import { FacultyInterface } from 'models/facultyTypes';
import { createUseStyles } from 'react-jss';
import { Button, Grid, TextField } from '@material-ui/core';
import { getCurrentUser } from 'services/authService';

const emptyFaculty: FacultyInterface = {
  id: '',
  name: '',
  activity: '',
  classes: []
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

const Faculty: React.FC<RouteComponentProps<any>> = ({ history, match }) => {
  const [currentFaculty, setCurrentFaculty] = useState<FacultyInterface>(emptyFaculty);
  const [message, setMessage] = useState('');
  const [showEditOption, setShowEditOption] = useState(false);
  const [showDeleteCheck, setShowDeleteCheck] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setShowEditOption(user.roles.includes('ROLE_ADMIN'));
      console.log(showEditOption);
    }
  }, [showEditOption]);

  const getFaculty = (id: string) => {
    get(id)
      .then((response) => {
        setCurrentFaculty(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        const status = e.status;
        if (status === 403) {
          console.log('Unauthorized');
        }
        setMessage(e.response.data.message);
      });
  };

  useEffect(() => {
    getFaculty(match.params.id);
  }, [match.params.id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentFaculty({ ...currentFaculty, [name]: value });
  };

  const confirmDelete = () => {
    setShowDeleteCheck(false);
    deleteFaculty();
  };

  const cancelDelete = () => {
    setShowDeleteCheck(false);
  };

  const displayDeleteCheck = () => {
    setShowDeleteCheck(true);
  };

  const updateFaculty = () => {
    update(currentFaculty.id, currentFaculty)
      .then((response) => {
        console.log(response.data);
        setMessage('The faculty was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
        setMessage(e.response.data.message);
      });
  };

  const deleteFaculty = () => {
    setShowDeleteCheck(false);
    remove(currentFaculty.id)
      .then((response) => {
        console.log(response.data);
        history.push('/home');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Grid container direction={'column'} justify={'center'} alignItems={'center'}>
      {currentFaculty ? (
        <div className={classes.formHolder}>
          <h3 className={classes.formTitle}>Faculty</h3>
          <form>
            <div className="">
              <TextField
                type="text"
                className={classes.fieldStyle}
                id="name"
                name="name"
                label={'Name'}
                variant="filled"
                value={currentFaculty.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="">
              <TextField
                type="text"
                className={classes.fieldStyle}
                variant="filled"
                label={'Activity'}
                id="activity"
                name="activity"
                value={currentFaculty.activity}
                onChange={handleInputChange}
              />
            </div>
          </form>
          {showEditOption ? (
            <div>
              <Button
                type="submit"
                variant={'contained'}
                size={'large'}
                className={classes.formUpdateButton}
                onClick={updateFaculty}
              >
                Update
              </Button>

              <Button
                type="submit"
                variant={'contained'}
                size={'large'}
                className={classes.formButton}
                onClick={displayDeleteCheck}
              >
                Delete
              </Button>
            </div>
          ) : (
            <div></div>
          )}
          <p>{message}</p>
          {showDeleteCheck ? (
            <div>
              <div>Are you sure you want to delete this faculty?</div>
              <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant={'outlined'}
                    size={'large'}
                    className={classes.yesButton}
                    onClick={confirmDelete}
                  >
                    Yes
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant={'outlined'}
                    size={'large'}
                    className={classes.noButton}
                    onClick={cancelDelete}
                  >
                    No
                  </Button>
                </Grid>
              </Grid>
            </div>
          ) : (
            <div></div>
          )}
          <div>{message}</div>
        </div>
      ) : (
        <div>
          <br />
          <p>Please select a Faculty</p>
        </div>
      )}
    </Grid>
  );
};

export default Faculty;

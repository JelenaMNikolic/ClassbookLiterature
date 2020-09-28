import React, { useState } from 'react';
import { create } from 'services/facultyService';
import { FacultyInterface } from 'models/facultyTypes';
import { Button, Grid, TextField } from '@material-ui/core';
import { createUseStyles } from 'react-jss';

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
  formButton: {
    width: '100%',
    backgroundColor: '#C63C96 !important',
    marginBottom: '30px !important'
  }
});

const AddFaculty = () => {
  const [faculty, setFaculty] = useState<FacultyInterface>(emptyFaculty);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFaculty({ ...faculty, [name]: value });
  };

  const saveFaculty = () => {
    const data = {
      name: faculty.name,
      activity: faculty.activity
    };

    create(data)
      .then((response) => {
        setFaculty({
          id: response.data.id,
          name: response.data.name,
          activity: response.data.activity,
          classes: response.data.classes
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        setMessage(e.response.data.message);
      });
  };

  return (
    <Grid container direction={'column'} justify={'center'} alignItems={'center'} className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
        </div>
      ) : (
        <div className={classes.formHolder}>
          <h3 className={classes.formTitle}>Add New Faculty</h3>
          <div className="form-group">
            <TextField
              type="text"
              className={classes.fieldStyle}
              id="name"
              required
              label={'Name'}
              value={faculty.name}
              onChange={handleInputChange}
              name="name"
              variant="filled"
            />
          </div>
          <div className="form-group">
            <TextField
              type="text"
              className={classes.fieldStyle}
              id="activity"
              label={'Activity'}
              value={faculty.activity}
              onChange={handleInputChange}
              name="activity"
              variant="filled"
            />
          </div>

          <Button onClick={saveFaculty} variant={'contained'} size={'large'} className={classes.formButton}>
            Submit
          </Button>
          <div>{message}</div>
        </div>
      )}
    </Grid>
  );
};

export default AddFaculty;

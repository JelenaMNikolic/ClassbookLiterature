import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  pageContent: {
    margin: '50px 0'
  },
  link: {
    color: '#014A7C'
  }
});

const Unauthorized = () => {
  const classes = useStyles();

  return (
    <Grid container direction={'column'} justify={'center'} alignItems={'center'} className={classes.pageContent}>
      <h2>You are not authorized to access this page.</h2>
      <p>
        Please return to{' '}
        <Link className={classes.link} to={'/home'}>
          Home
        </Link>
      </p>
    </Grid>
  );
};

export default Unauthorized;

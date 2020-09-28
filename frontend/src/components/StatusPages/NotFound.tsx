import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  pageContent: {
    margin: '50px 0'
  },
  link: {
    color: '#014A7C',
    display: 'inline'
  }
});

const NotFound = () => {
  const classes = useStyles();

  return (
    <Grid container direction={'column'} justify={'center'} alignItems={'center'} className={classes.pageContent}>
      <h2>The page you tried to visit no longer exists.</h2>
      <p>Please return to</p>
      <Link className={classes.link} to={'/home'}>
        Home
      </Link>
    </Grid>
  );
};

export default NotFound;

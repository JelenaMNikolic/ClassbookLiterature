import React, { useEffect, useState } from 'react';
import { getPublicContent } from 'services/userService';
import { createUseStyles } from 'react-jss';
import { Grid } from '@material-ui/core';
import book from '../assets/img/book.png';

const useStyles = createUseStyles({
  headerStyle: {
    backgroundColor: '#dcdcdc',
    '& h4': {
      letterSpacing: '1px',
      fontWeight: '400'
    }
  },
  bookAnimationHolder: {
    padding: '10vh 0'
  },
  bookImage: {
    position: 'absolute',
    width: '250px'
  },
  bookAnimationBase: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: '4px solid transparent'
  },
  bookAnimationInner: {
    width: '300px',
    height: '300px',
    borderTopColor: '#014A7C',
    transform: 'rotate(-40deg)',
    transition: 'transform .4s ease-in-out'
  },
  bookAnimationMiddle: {
    width: '315px',
    height: '315px',
    borderTopColor: '#C63C96',
    borderRightColor: '#C63C96',
    transform: 'rotate(-76deg)',
    transition: 'transform .4s ease-in-out'
  },
  bookAnimationOuter: {
    width: '330px',
    height: '330px',
    borderTopColor: '#FDB94D',
    borderRightColor: '#FDB94D',
    borderBottomColor: '#FDB94D',
    transform: 'rotate(49deg)',
    zIndex: 10,
    '& :hover': {
      transform: 'rotate(40deg)',
      transition: 'transform .4s ease-in-out'
    }
  }
});

const Home = () => {
  const [content, setContent] = useState('');
  const classes = useStyles();

  useEffect(() => {
    getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content = (error.response && error.response.data) || error.message || error.toString();
        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
      <Grid container direction={'row'} justify={'center'} alignItems={'center'} className={classes.headerStyle}>
        <h4>{content}</h4>
      </Grid>
      <Grid
        container
        direction={'row'}
        justify={'center'}
        alignItems={'center'}
        className={classes.bookAnimationHolder}
      >
        <div className={`${classes.bookAnimationOuter} ${classes.bookAnimationBase}`}>
          <div className={`${classes.bookAnimationMiddle} ${classes.bookAnimationBase}`}>
            <div className={`${classes.bookAnimationInner} ${classes.bookAnimationBase}`}></div>
          </div>
        </div>
        <img src={book} alt={'home'} className={classes.bookImage} />
      </Grid>
    </div>
  );
};

export default Home;

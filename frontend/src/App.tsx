import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, RouteComponentProps, Switch } from 'react-router-dom';
import logo from './assets/img/logo.png';
import user from './assets/img/user.png';
import fonLogo from './assets/img/fon-logo-eng.png';

import Login from 'components/Login';
import Register from 'components/Register';
import Home from 'components/Home';
import Profile from 'components/Profile';
import BoardUser from 'components/BoardUser';
import BoardAdmin from 'components/BoardAdmin';
import Faculty from 'components/Faculty/Faculty';
import AddFaculty from 'components/Faculty/AddFaculty';
import Classes from 'components/Classes/Classes';
import { UserInterface } from 'models/userTypes';
import { getCurrentUser, logout } from 'services/authService';
import AddClass from 'components/Classes/AddClass';
import DigitalLiterature from 'components/DigitalLiterature/DigitalLiterature';
import AddDigitalLiterature from 'components/DigitalLiterature/AddDigitalLiterature';
import AddAnalogLiterature from 'components/AnalogLiterature/AddAnalogLiterature';
import AnalogLiterature from 'components/AnalogLiterature/AnalogLiterature';
import SystemUser from 'components/SystemUsers/SystemUsers';
import { createUseStyles } from 'react-jss';
import Unauthorized from 'components/StatusPages/Unauthorized';
import { Grid } from '@material-ui/core';
import NotFound from 'components/StatusPages/NotFound';

const useStyles = createUseStyles({
  headerBar: {
    borderBottom: '1px solid #2ABB9D',
    display: 'flex',
    justifyContent: 'space-between'
  },
  flexHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& nav': {
      height: '100%',
      '& ul': {
        height: '100%',
        '& li': {
          height: '100%',
          display: 'flex',
          alignItems: 'center'
        }
      }
    }
  },
  navItems: {
    '& a': {
      transition: 'color .2s ease-in-out'
    },
    '& >li:hover>a': {
      color: '#014A7C'
    }
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    marginLeft: '40px'
  },
  logoImage: {
    width: '150px'
  },
  userImage: {
    width: '30px',
    margin: '0 60px 0 20px'
  },
  hasDropdown: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '&:hover $headerDropdown': {
      opacity: 1,
      transition: 'opacity .2s ease-in-out'
    },
    '& :last-child': {
      right: 0
    }
  },
  headerDropdown: {
    position: 'absolute',
    top: '102px',
    display: 'flex',
    opacity: 0,
    transition: 'opacity .2s ease-in-out',
    zIndex: 100,
    '& ul': {
      width: '100px',
      border: '1px solid #2ABB9D',
      borderTop: 'none',
      padding: '20px',
      backgroundColor: '#fff',
      '& li': {
        margin: '10px 0',
        textTransform: 'none',
        fontWeight: '400',
        fontSize: '16px'
      }
    }
  },
  footerContent: {
    borderTop: '1px solid #C63C96',
    '& div': {
      margin: '20px 60px',
      fontSize: '11px'
    }
  }
});

function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserInterface>();
  const classes = useStyles();

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
      console.log(showAdminBoard);
    }
  }, [showAdminBoard]);

  const logOut = () => {
    logout();
  };

  return (
    <Router>
      <div className="">
        <div className={classes.headerBar}>
          <Link to={'/'} className={classes.logoLink}>
            <img src={logo} alt="logo" className={classes.logoImage} />
          </Link>
          <div className={classes.flexHorizontal}>
            <nav className={classes.flexHorizontal}>
              <ul className={`${classes.flexHorizontal} headerText ${classes.navItems}`}>
                <li className="">
                  <Link to={'/home'} className="">
                    Home
                  </Link>
                </li>
                {showAdminBoard && (
                  <li className={classes.hasDropdown}>
                    <Link to={'/admin'} className="">
                      Admin Board
                    </Link>
                    <div className={classes.headerDropdown}>
                      <ul>
                        <li className="">
                          <Link to={'/faculties'} className="">
                            Add Faculty
                          </Link>
                        </li>
                        <li className="">
                          <Link to={'/classes'} className="">
                            Add Class
                          </Link>
                        </li>
                        <li className="">
                          <Link to={'/digital/scripts'} className="">
                            Add Script
                          </Link>
                        </li>
                        <li className="">
                          <Link to={'/analog/scripts'} className="">
                            Add Book
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}

                {currentUser && (
                  <li className="">
                    <Link to={'/user'} className="">
                      List
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
            {currentUser ? (
              <div className={classes.hasDropdown}>
                <Link to={'/profile'} className="">
                  <img src={user} alt="profile" className={classes.userImage} />
                </Link>
                <div className={classes.headerDropdown}>
                  <ul>
                    <li className="">
                      <Link to={'/profile'} className="">
                        {currentUser?.username}
                      </Link>
                    </li>
                    <li className="">
                      <a href={'/'} className="" onClick={logOut}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className={classes.hasDropdown}>
                <Link to={'/'} className="">
                  <img src={user} alt="profile" className={classes.userImage} />
                </Link>
                <div className={classes.headerDropdown}>
                  <ul>
                    <li className="">
                      <Link to={'/login'} className="">
                        Login
                      </Link>
                    </li>
                    <li className="">
                      <Link to={'/register'} className="">
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="">
          <Switch>
            <Route exact path={['/', '/home']} render={() => <Home />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/register" render={() => <Register />} />
            <Route exact path="/profile" render={() => <Profile />} />
            <Route path="/user" render={() => <BoardUser />} />
            <Route path="/admin" render={(props: RouteComponentProps<any>) => <BoardAdmin {...props} />} />
            <Route exact path="/faculties" render={() => <AddFaculty />} />
            <Route exact path="/classes" render={() => <AddClass />} />
            <Route exact path="/digital/scripts" render={() => <AddDigitalLiterature />} />
            <Route exact path="/analog/scripts" render={() => <AddAnalogLiterature />} />
            <Route path={'/faculties/:id'} render={(props: RouteComponentProps<any>) => <Faculty {...props} />} />
            <Route path={'/classes/:id'} render={(props: RouteComponentProps<any>) => <Classes {...props} />} />
            <Route path={'/users/:id'} render={(props: RouteComponentProps<any>) => <SystemUser {...props} />} />
            <Route
              path={'/digital/scripts/:id'}
              render={(props: RouteComponentProps<any>) => <DigitalLiterature {...props} />}
            />
            <Route
              path={'/analog/scripts/:id'}
              render={(props: RouteComponentProps<any>) => <AnalogLiterature {...props} />}
            />
            <Route path={'/unauthorized'} render={() => <Unauthorized />} />
            <Route path="*" render={() => <NotFound />} />
          </Switch>
        </div>
      </div>
      <footer>
        <Grid
          container
          direction={'row'}
          justify={'space-between'}
          alignItems={'center'}
          className={classes.footerContent}
        >
          <div>
            <span>©ClassbookLit 2020</span>
          </div>
          <div>
            <img src={fonLogo} alt={'fon'} />
          </div>
        </Grid>
      </footer>
    </Router>
  );
}

export default App;

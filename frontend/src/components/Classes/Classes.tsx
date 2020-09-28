import React, { ChangeEvent, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { get, remove, update } from 'services/classService';
import { getAll } from 'services/facultyService';
import { getAll as getAllBooks } from 'services/analogLitService';
import { getAll as getAllScripts } from 'services/digitalLitService';
import { ClassInterface } from 'models/classTypes';
import { FacultyInterface } from 'models/facultyTypes';
import { AnalogLiteratureInterface } from 'models/analogLiteratureType';
import { DigitalLiteratureInterface } from 'models/digitalLiteratureTypes';
import { createUseStyles } from 'react-jss';
import {
  AppBar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core';
import { getCurrentUser } from 'services/authService';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AuthorInterface } from 'models/authorType';

const emptyFaculty: FacultyInterface = {
  id: '',
  name: '',
  activity: '',
  classes: []
};

const emptyClass: ClassInterface = {
  id: '',
  acronym: '',
  name: '',
  type: '',
  semester: '',
  faculty: emptyFaculty,
  books: [],
  scripts: []
};

const useStyles = createUseStyles({
  formHolder: {
    margin: '100px 0',
    padding: '30px 40px',
    border: '1px solid #e3e3e3',
    borderRadius: '10px',
    width: '80%'
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
    marginBottom: '10px !important',
    marginLeft: '10px !important'
  },
  removeButton: {
    width: '100%',
    backgroundColor: '#C63C96 !important'
  },
  selectField: {
    width: '90%',
    marginBottom: '10px !important',
    marginTop: '10px !important',
    left: '10px',
    '& label': {
      top: '-20px !important'
    }
  },
  selectFieldInTab: {
    width: '100%',
    marginBottom: '10px !important',
    marginTop: '10px !important',
    '& label': {
      top: '-20px !important'
    }
  },
  literatureExisting: {
    width: '100%',
    height: '30px',
    backgroundColor: '#e3e3e3',
    border: '1px solid #d5d5d5',
    textAlign: 'center',
    borderRadius: '5px',
    margin: '10px 0'
  },
  textarea: {
    width: '100%',
    borderColor: '#e3e3e3',
    borderRadius: '5px',
    textAlign: 'center',
    padding: '10px 0'
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
  },
  generalInfo: {
    width: '80%'
  },
  tabsHeader: {
    position: 'relative !important',
    zIndex: '0 !important',
    width: '96% !important',
    marginLeft: '24px'
  },
  tabPannel: {
    width: '100%',
    padding: '24px 0'
  },
  tableContainer: {
    border: '1px solid #e3e3e3',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px #eeeeee'
  }
});

const useThemeStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    padding: '24px 0'
  }
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const Classes: React.FC<RouteComponentProps<any>> = ({ history, match }) => {
  const [currentClass, setCurrentClass] = useState<any>(emptyClass);
  const [currentBook, setCurrentBook] = useState<any>();
  const [currentScript, setCurrentScript] = useState<any>();
  const [message, setMessage] = useState('');
  const [facultyList, setFacultyList] = useState<FacultyInterface[]>([]);
  const [booksList, setBooksList] = useState<any>([]);
  const [showEditOption, setShowEditOption] = useState(false);
  const [scriptsList, setScriptsList] = useState<any>([]);
  const [showDeleteCheck, setShowDeleteCheck] = useState(false);

  const themeClasses = useThemeStyles();
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        className={classes.tabPannel}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setShowEditOption(user.roles.includes('ROLE_ADMIN'));
      console.log(showEditOption);
    }
  }, [showEditOption]);

  const getScripts = () => {
    getAllScripts()
      .then((response) => {
        setScriptsList(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    getScripts();
  }, []);

  const getBooks = () => {
    getAllBooks()
      .then((response) => {
        setBooksList(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBooks();
  }, []);

  const getClass = (id: string) => {
    get(id)
      .then((response) => {
        setCurrentClass(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getClass(match.params.id);
  }, [match.params.id]);

  const getFaculties = () => {
    getAll()
      .then((response) => {
        setFacultyList(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFaculties();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentClass({ ...currentClass, [name]: value });
  };

  const handleFacultyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedFaculty = facultyList.find(
      (facultyItem: any) => Number.parseInt(event.target.value) === facultyItem.id
    );
    console.log(facultyList, selectedFaculty);
    setCurrentClass({ ...currentClass, faculty: selectedFaculty });
  };

  const handleBookChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLiterature = booksList.find(
      (literature: any) => Number.parseInt(event.target.value) === literature.id
    );
    console.log(selectedLiterature);
    const currentLiteratureList = currentClass.books;
    currentLiteratureList.push(selectedLiterature);
    setCurrentClass({ ...currentClass, literature: currentLiteratureList });
  };

  const handleScriptChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLiterature = scriptsList.find(
      (literature: any) => Number.parseInt(event.target.value) === literature.id
    );
    const currentLiteratureList = currentClass.scripts;
    currentLiteratureList.push(selectedLiterature);
    setCurrentClass({ ...currentClass, literature: currentLiteratureList });
  };

  const setActiveBook = (book: any) => {
    setCurrentBook(book);
  };

  const setActiveScript = (script: any) => {
    setCurrentScript(script);
  };

  const removeCurrentBook = () => {
    const index = currentClass.books.indexOf(currentBook);
    const currentBooksList = currentClass.books;
    currentBooksList.splice(index, 1);
    setCurrentClass({ ...currentClass, books: currentBooksList });
  };

  const removeCurrentScript = () => {
    const index = currentClass.scripts.indexOf(currentScript);
    const currentScriptList = currentClass.scripts;
    currentScriptList.splice(index, 1);
    setCurrentClass({ ...currentClass, scripts: currentScriptList });
  };

  const confirmDelete = () => {
    setShowDeleteCheck(false);
    deleteClass();
  };

  const cancelDelete = () => {
    setShowDeleteCheck(false);
  };

  const displayDeleteCheck = () => {
    setShowDeleteCheck(true);
  };

  const updateClass = () => {
    update(currentClass.id, currentClass)
      .then((response) => {
        console.log(response.data);
        setMessage('The Class was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
        setMessage(e.response.data.message);
      });
  };

  const deleteClass = () => {
    setShowDeleteCheck(false);
    remove(currentClass.id)
      .then((response) => {
        console.log(response.data);
        history.push('/home');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
      {currentClass ? (
        <div className={classes.formHolder}>
          <h3 className={classes.formTitle}>Class</h3>
          <Grid container direction={'row'} justify={'center'} alignItems={'flex-start'}>
            <Grid item xs={3}>
              <h4 className="">Class information</h4>
              <Grid container direction={'column'} justify={'center'} alignItems={'center'}>
                <div className={classes.generalInfo}>
                  <TextField
                    type="text"
                    className={classes.fieldStyle}
                    variant="filled"
                    label={'Acronym'}
                    id="acronym"
                    name="acronym"
                    value={currentClass.acronym}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={classes.generalInfo}>
                  <TextField
                    type="text"
                    className={classes.fieldStyle}
                    variant="filled"
                    label={'Name'}
                    id="name"
                    name="name"
                    value={currentClass.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={classes.generalInfo}>
                  <TextField
                    type="text"
                    className={classes.fieldStyle}
                    variant="filled"
                    label={'Type'}
                    id="type"
                    name="type"
                    value={currentClass.type}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={classes.generalInfo}>
                  <TextField
                    type="text"
                    className={classes.fieldStyle}
                    variant="filled"
                    label={'Semester'}
                    id="semester"
                    name="semester"
                    value={currentClass.semester}
                    onChange={handleInputChange}
                  />
                </div>
                <FormControl variant="filled" className={classes.selectField}>
                  <InputLabel htmlFor="faculty">Faculty</InputLabel>
                  <NativeSelect
                    className={classes.selectField}
                    variant="filled"
                    id="faculty"
                    name="faculty"
                    onChange={handleFacultyChange}
                    value={currentClass.faculty.id}
                  >
                    {facultyList &&
                      facultyList.map((faculty: FacultyInterface) => (
                        <option key={faculty.id} value={faculty.id}>
                          {faculty.name}
                        </option>
                      ))}
                  </NativeSelect>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={9} className={themeClasses.root}>
              <AppBar className={classes.tabsHeader} color="default" position="static">
                <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
                  <Tab label="Books" {...a11yProps(0)} />
                  <Tab label="Scripts" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <TableContainer className={classes.tableContainer}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Month</TableCell>
                        <TableCell>Note</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Publisher</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Editor</TableCell>
                        <TableCell>Edition</TableCell>
                        <TableCell>Number</TableCell>
                        <TableCell>Series</TableCell>
                        <TableCell>Volume</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentClass.books &&
                        currentClass.books.map((book: any) => (
                          <TableRow key={book.id} onClick={() => setActiveBook(book)}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.month}</TableCell>
                            <TableCell>{book.note}</TableCell>
                            <TableCell>{book.year}</TableCell>
                            <TableCell>{book.publisher}</TableCell>
                            <TableCell>{book.address}</TableCell>
                            <TableCell>
                              {book.author.map(
                                (currentAuthor: AuthorInterface) =>
                                  currentAuthor.name + ' ' + currentAuthor.surname + ','
                              )}
                            </TableCell>
                            <TableCell>{book.editor}</TableCell>
                            <TableCell>{book.edition}</TableCell>
                            <TableCell>{book.number}</TableCell>
                            <TableCell>{book.series}</TableCell>
                            <TableCell>{book.volume}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {currentBook ? (
                  <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                    <Grid item xs={1}>
                      <h4>Book</h4>
                    </Grid>
                    <Grid item xs={8}>
                      <div className="">{currentBook.title}</div>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant={'contained'}
                        size={'large'}
                        className={classes.removeButton}
                        onClick={removeCurrentBook}
                      >
                        Remove from List
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <div>
                    <br />
                  </div>
                )}
                <FormControl variant="filled" className={classes.selectFieldInTab}>
                  <InputLabel htmlFor="books">Select Book</InputLabel>
                  {booksList ? (
                    <NativeSelect
                      className={classes.selectFieldInTab}
                      variant="filled"
                      id="books"
                      name="books"
                      onChange={handleBookChange}
                      value=""
                    >
                      <option key={'emtptyBook'} value={''}>
                        Choose Book
                      </option>
                      {booksList &&
                        booksList.map((literature: AnalogLiteratureInterface) => (
                          <option key={'books' + literature.id} value={literature.id}>
                            {literature.title}
                          </option>
                        ))}
                    </NativeSelect>
                  ) : (
                    <div>There are no books to select from.</div>
                  )}
                </FormControl>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TableContainer className={classes.tableContainer}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Month</TableCell>
                        <TableCell>Note</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Format</TableCell>
                        <TableCell>Author</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentClass.scripts &&
                        currentClass.scripts.map((script: any) => (
                          <TableRow key={script.id} onClick={() => setActiveScript(script)}>
                            <TableCell>{script.title}</TableCell>
                            <TableCell>{script.month}</TableCell>
                            <TableCell>{script.note}</TableCell>
                            <TableCell>{script.yearOfPublishing}</TableCell>
                            <TableCell>{script.format}</TableCell>
                            <TableCell>
                              {script.author.map(
                                (currentAuthor: AuthorInterface) =>
                                  currentAuthor.name + ' ' + currentAuthor.surname + ','
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {currentScript ? (
                  <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                    <Grid item xs={1}>
                      <h4>Script</h4>
                    </Grid>
                    <Grid item xs={8}>
                      <div className="">{currentScript.title}</div>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant={'contained'}
                        size={'large'}
                        className={classes.removeButton}
                        onClick={removeCurrentScript}
                      >
                        Remove from List
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <div>
                    <br />
                  </div>
                )}
                <FormControl variant="filled" className={classes.selectFieldInTab}>
                  <InputLabel htmlFor="scripts">Select Script</InputLabel>
                  <NativeSelect
                    className={classes.selectFieldInTab}
                    variant="filled"
                    id="scripts"
                    name="scripts"
                    onChange={handleScriptChange}
                    value=""
                  >
                    <option key={'emtptyScript'} value={''}>
                      Choose Script
                    </option>
                    {scriptsList &&
                      scriptsList.map((literature: DigitalLiteratureInterface) => (
                        <option key={'scripts' + literature.id} value={literature.id}>
                          {literature.title}
                        </option>
                      ))}
                  </NativeSelect>
                </FormControl>
              </TabPanel>
            </Grid>
          </Grid>
          {showEditOption ? (
            <Grid container direction={'row'} justify={'flex-end'} alignItems={'center'}>
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant={'contained'}
                  size={'large'}
                  className={classes.formUpdateButton}
                  onClick={updateClass}
                >
                  Update
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant={'contained'}
                  size={'large'}
                  className={classes.formButton}
                  onClick={displayDeleteCheck}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
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
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Class...</p>
        </div>
      )}
    </Grid>
  );
};

export default Classes;

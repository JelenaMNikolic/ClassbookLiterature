import React, { ChangeEvent, useEffect, useState } from 'react';
import { AnalogLiteratureInterface } from 'models/analogLiteratureType';
import { get, remove, update } from 'services/analogLitService';
import { createUseStyles } from 'react-jss';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';
import { getCurrentUser } from 'services/authService';
import { getAll } from 'services/auhtorService';
import { AuthorInterface } from 'models/authorType';

const emptyLiterature: AnalogLiteratureInterface = {
  id: '',
  title: '',
  month: '',
  yearOfPublishing: '',
  note: '',
  classes: [],
  publisher: '',
  address: '',
  author: [],
  editor: '',
  edition: '',
  number: '',
  series: '',
  volume: ''
};

const useStyles = createUseStyles({
  formHolder: {
    margin: '100px 0',
    padding: '30px 40px',
    border: '1px solid #e3e3e3',
    borderRadius: '10px',
    width: '40%'
  },
  fieldStyle: {
    marginBottom: '15px !important',
    width: '95%'
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
  okButton: {
    width: '100%',
    borderColor: '#014A7C !important',
    margin: '30px 0 !important'
  },
  noButton: {
    width: '95%',
    borderColor: '#014A7C !important',
    marginBottom: '30px !important'
  },
  tableContainer: {
    border: '1px solid #e3e3e3',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px #eeeeee'
  },
  removeButton: {
    width: '100%',
    backgroundColor: '#C63C96 !important'
  },
  selectField: {
    width: '100%',
    marginBottom: '10px !important',
    marginTop: '10px !important',
    '& label': {
      top: '-20px !important'
    }
  },
  formTwoColumnContainer: {
    width: 'auto !important'
  },
  bibtexHolder: {
    position: 'fixed',
    zIndex: 250,
    top: '40%',
    left: '50%',
    backgroundColor: 'white',
    width: '20% !important',
    transform: 'translateX(-50%) translateY(-50%)',
    '& p': {
      margin: 0
    }
  }
});

const AnalogLiterature: React.FC<any> = ({ history, match }) => {
  const [currentLiterature, setCurrentLiterature] = useState<AnalogLiteratureInterface>(emptyLiterature);
  const [message, setMessage] = useState('');
  const [validData, setValidData] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState<any>();
  const [authorsList, setAuthorsList] = useState<any>([]);
  const [showEditOption, setShowEditOption] = useState(false);
  const [showDeleteCheck, setShowDeleteCheck] = useState(false);
  const [showBibTex, setShowBibTex] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setShowEditOption(user.roles.includes('ROLE_ADMIN'));
      console.log(showEditOption);
    }
  }, [showEditOption]);

  const getLiterature = (id: string) => {
    get(id)
      .then((response) => {
        setCurrentLiterature(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        const status = e.status;
        if (status === '401') {
          console.log('Unauthorized');
        }
      });
  };

  useEffect(() => {
    getLiterature(match.params.id);
  }, [match.params.id]);

  const getAuthors = () => {
    getAll()
      .then((response) => {
        setAuthorsList(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAuthors();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentLiterature({ ...currentLiterature, [name]: value });
  };

  const handleAuthorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedAuthor = authorsList.find((author: any) => Number.parseInt(event.target.value) === author.id);
    console.log(selectedAuthor);
    const currentAuthorsList = currentLiterature.author;
    currentAuthorsList.push(selectedAuthor);
    setCurrentLiterature({ ...currentLiterature, author: currentAuthorsList });
  };

  const removeCurrentAuthor = () => {
    const index = currentLiterature.author.indexOf(currentAuthor);
    const currentAuthorsList = currentLiterature.author;
    currentAuthorsList.splice(index, 1);
    setCurrentLiterature({ ...currentLiterature, author: currentAuthorsList });
  };

  const confirmDelete = () => {
    setShowDeleteCheck(false);
    deleteLiterature();
  };

  const cancelDelete = () => {
    setShowDeleteCheck(false);
  };

  const displayDeleteCheck = () => {
    setShowDeleteCheck(true);
  };

  const setActiveAuthor = (author: any) => {
    setCurrentAuthor(author);
  };

  const updateLiterature = () => {
    if (
      currentLiterature.title === '' ||
      currentLiterature.yearOfPublishing === '' ||
      currentLiterature.publisher === '' ||
      currentLiterature.author.length === 0
    ) {
      setMessage('Make sure to fill all required fields.');
      setValidData(false);
    } else {
      setValidData(true);
    }

    if (validData) {
      update(currentLiterature.id, currentLiterature)
        .then((response) => {
          console.log(response.data);
          setMessage('The script was updated successfully!');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const deleteLiterature = () => {
    setShowDeleteCheck(false);
    remove(currentLiterature.id)
      .then((response) => {
        console.log(response.data);
        history.push('/home');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const displayBibTex = () => {
    setShowBibTex(true);
  };

  const hideBibTex = () => {
    setShowBibTex(false);
  };

  return (
    <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
      {currentLiterature ? (
        <Grid
          container
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
          className={`${classes.formHolder} ${classes.formTwoColumnContainer}`}
        >
          <h3 className={classes.formTitle}>Book</h3>
          <Grid
            container
            direction={'row'}
            justify={'center'}
            alignItems={'flex-start'}
            className={classes.formTwoColumnContainer}
          >
            <Grid item xs={6}>
              <div className="">
                <TextField
                  type="text"
                  className={classes.fieldStyle}
                  label={'Title'}
                  variant={'filled'}
                  id="title"
                  name="title"
                  value={currentLiterature.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  className={classes.fieldStyle}
                  label={'Month'}
                  variant={'filled'}
                  id="month"
                  name="month"
                  value={currentLiterature.month}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  className={classes.fieldStyle}
                  label={'Year'}
                  variant={'filled'}
                  id="yearOfPublishing"
                  name="yearOfPublishing"
                  value={currentLiterature.yearOfPublishing}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  className={classes.fieldStyle}
                  label={'Note'}
                  variant={'filled'}
                  id="note"
                  name="note"
                  value={currentLiterature.note}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  className={classes.fieldStyle}
                  label={'Publisher'}
                  variant={'filled'}
                  id="publisher"
                  name="publisher"
                  value={currentLiterature.publisher}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  className={classes.fieldStyle}
                  label={'Address'}
                  variant={'filled'}
                  id="address"
                  name="address"
                  value={currentLiterature.address}
                  onChange={handleInputChange}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="">
                <TextField
                  type="text"
                  className={classes.fieldStyle}
                  label={'Editor'}
                  variant={'filled'}
                  id="editor"
                  name="editor"
                  value={currentLiterature.editor}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  className={classes.fieldStyle}
                  label={'Edition'}
                  variant={'filled'}
                  id="edition"
                  name="edition"
                  value={currentLiterature.edition}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  className={classes.fieldStyle}
                  label={'Number'}
                  variant={'filled'}
                  id="number"
                  name="number"
                  value={currentLiterature.number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  className={classes.fieldStyle}
                  label={'Series'}
                  variant={'filled'}
                  id="series"
                  name="series"
                  value={currentLiterature.series}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  className={classes.fieldStyle}
                  label={'Volume'}
                  variant={'filled'}
                  id="volume"
                  name="volume"
                  value={currentLiterature.volume}
                  onChange={handleInputChange}
                />
              </div>
            </Grid>
            <Grid xs={12}>
              <TableContainer className={classes.tableContainer}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Surname</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentLiterature.author &&
                      currentLiterature.author.map((author: any) => (
                        <TableRow key={author.id} onClick={() => setActiveAuthor(author)}>
                          <TableCell>{author.name}</TableCell>
                          <TableCell>{author.surname}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {currentAuthor ? (
                <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                  <Grid item xs={2}>
                    <h4>Author</h4>
                  </Grid>
                  <Grid item xs={7}>
                    <div className="">
                      {currentAuthor.name} {currentAuthor.surname}
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant={'contained'}
                      size={'large'}
                      className={classes.removeButton}
                      onClick={removeCurrentAuthor}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <div>
                  <br />
                </div>
              )}
              <FormControl variant="filled" className={classes.selectField}>
                <InputLabel htmlFor="books">Select Author</InputLabel>
                {authorsList ? (
                  <NativeSelect
                    className={classes.selectField}
                    variant="filled"
                    id="books"
                    name="books"
                    onChange={handleAuthorChange}
                    value=""
                  >
                    <option key={'emtptyAuthor'} value={''}>
                      Choose Author
                    </option>
                    {authorsList &&
                      authorsList.map((author: AuthorInterface) => (
                        <option key={'author' + author.id} value={author.id}>
                          {author.name} {author.surname}
                        </option>
                      ))}
                  </NativeSelect>
                ) : (
                  <div>There are no authors to select from.</div>
                )}
              </FormControl>
            </Grid>
          </Grid>
          {showEditOption ? (
            <div>
              <Button
                type="submit"
                variant={'contained'}
                size={'large'}
                className={classes.formUpdateButton}
                onClick={updateLiterature}
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
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant={'outlined'}
                  size={'large'}
                  className={classes.okButton}
                  onClick={displayBibTex}
                >
                  Show BibTex Format
                </Button>
              </Grid>
            </div>
          ) : (
            <div>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant={'outlined'}
                  size={'large'}
                  className={classes.okButton}
                  onClick={displayBibTex}
                >
                  Show BibTex Format
                </Button>
              </Grid>
            </div>
          )}
          <p>{message}</p>
          {showDeleteCheck ? (
            <div>
              <div>Are you sure you want to delete this book?</div>
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
          {showBibTex ? (
            <Grid container direction={'column'} justify={'center'} alignItems={'center'}>
              <Grid
                container
                direction={'column'}
                justify={'center'}
                alignItems={'flex-start'}
                className={`${classes.formHolder} ${classes.bibtexHolder}`}
              >
                <p>
                  <span>@book&#123;</span>
                  <span>{currentLiterature.author[0].name.toLowerCase()}</span>
                  <span>{currentLiterature.yearOfPublishing},</span>
                </p>
                <p>
                  <span>author = </span>
                  <span>
                    "{currentLiterature.author.map((item: AuthorInterface) => item.name + ' ' + item.surname + ',')}",
                  </span>
                </p>
                <p>
                  <span>title = </span>
                  <span>"{currentLiterature.title}",</span>
                </p>
                <p>
                  <span>year = </span>
                  <span>"{currentLiterature.yearOfPublishing}",</span>
                </p>
                <p>
                  <span>month = </span>
                  <span>"{currentLiterature.month}",</span>
                </p>
                <p>
                  <span>address = </span>
                  <span>"{currentLiterature.address}",</span>
                </p>
                <p>
                  <span>publisher = </span>
                  <span>"{currentLiterature.publisher}",</span>
                </p>
                <p>
                  <span>edition = </span>
                  <span>"{currentLiterature.edition}",</span>
                </p>
                <p>
                  <span>editor = </span>
                  <span>"{currentLiterature.editor}",</span>
                </p>
                <p>
                  <span>address = </span>
                  <span>"{currentLiterature.address}",</span>
                </p>
                <p>
                  <span>number = </span>
                  <span>"{currentLiterature.number}",</span>
                </p>
                <p>
                  <span>series = </span>
                  <span>"{currentLiterature.series}",</span>
                </p>
                <p>
                  <span>volume = </span>
                  <span>"{currentLiterature.volume}",</span>
                </p>
                <p>
                  <span>note = </span>
                  <span>"{currentLiterature.note}"</span>
                </p>
                <p>
                  <span>&#125;</span>
                </p>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant={'outlined'}
                    size={'large'}
                    className={classes.okButton}
                    onClick={hideBibTex}
                  >
                    OK
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <div></div>
          )}
        </Grid>
      ) : (
        <div>
          <br />
          <p>There is no literature with selected ID</p>
        </div>
      )}
    </Grid>
  );
};

export default AnalogLiterature;

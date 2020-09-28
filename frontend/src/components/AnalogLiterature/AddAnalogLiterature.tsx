import React, { ChangeEvent, useEffect, useState } from 'react';

import { AnalogLiteratureInterface } from 'models/analogLiteratureType';
import { create } from 'services/analogLitService';
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
import { AuthorInterface } from 'models/authorType';
import { getAll } from 'services/auhtorService';

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
  }
});

const AddAnalogLiterature = () => {
  const [literature, setLiterature] = useState<any>(emptyLiterature);
  const [submitted, setSubmitted] = useState(false);
  const [validData, setValidData] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState<any>();
  const [authorsList, setAuthorsList] = useState<any>([]);
  const [message, setMessage] = useState('');
  const classes = useStyles();

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
    setLiterature({ ...literature, [name]: value });
  };

  const handleAuthorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedAuthor = authorsList.find((author: any) => Number.parseInt(event.target.value) === author.id);
    console.log(selectedAuthor);
    const currentAuthorsList = literature.author;
    currentAuthorsList.push(selectedAuthor);
    setLiterature({ ...literature, author: currentAuthorsList });
  };

  const removeCurrentAuthor = () => {
    const index = literature.author.indexOf(currentAuthor);
    const currentAuthorsList = literature.author;
    currentAuthorsList.splice(index, 1);
    setLiterature({ ...literature, author: currentAuthorsList });
  };

  const setActiveAuthor = (author: any) => {
    setCurrentAuthor(author);
  };

  const saveLiterature = () => {
    const data = {
      title: literature.title,
      month: literature.month,
      yearOfPublishing: literature.yearOfPublishing,
      note: literature.note,
      classes: literature.classes,
      publisher: literature.publisher,
      address: literature.address,
      author: literature.author,
      editor: literature.editor,
      edition: literature.edition,
      number: literature.number,
      series: literature.series,
      volume: literature.volume
    };
    console.log(data);

    if (data.title === '' || data.yearOfPublishing === '' || data.publisher === '' || data.author.length === 0) {
      setMessage('Make sure to fill all required fields.');
      setValidData(false);
    } else {
      setValidData(true);
    }

    console.log(validData);
    if (validData) {
      create(data)
        .then((response) => {
          setLiterature({
            id: response.data.id,
            title: response.data.title,
            month: response.data.month,
            yearOfPublishing: response.data.yearOfPublishing,
            note: response.data.note,
            classes: response.data.classes,
            publisher: response.data.publisher,
            address: response.data.address,
            author: response.data.author,
            editor: response.data.editor,
            edition: response.data.edition,
            number: response.data.number,
            series: response.data.series,
            volume: response.data.volume
          });
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Grid container direction={'column'} justify={'center'} alignItems={'center'} className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
        </div>
      ) : (
        <Grid
          container
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
          className={`${classes.formHolder} ${classes.formTwoColumnContainer}`}
        >
          <h3 className={classes.formTitle}>Add New Book</h3>
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
                  id="title"
                  name="title"
                  className={classes.fieldStyle}
                  label={'Title'}
                  variant={'filled'}
                  required={true}
                  value={literature.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  id="month"
                  name="month"
                  className={classes.fieldStyle}
                  label={'Month'}
                  variant={'filled'}
                  value={literature.month}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  id="yearOfPublishing"
                  name="yearOfPublishing"
                  className={classes.fieldStyle}
                  label={'Year of publishing'}
                  variant={'filled'}
                  required={true}
                  value={literature.yearOfPublishing}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  id="note"
                  name="note"
                  className={classes.fieldStyle}
                  label={'Note'}
                  variant={'filled'}
                  value={literature.note}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  id="publisher"
                  name="publisher"
                  className={classes.fieldStyle}
                  label={'Publisher'}
                  variant={'filled'}
                  required={true}
                  value={literature.publisher}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  id="address"
                  name="address"
                  className={classes.fieldStyle}
                  label={'Address'}
                  variant={'filled'}
                  value={literature.address}
                  onChange={handleInputChange}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="">
                <TextField
                  type="text"
                  id="editor"
                  name="editor"
                  className={classes.fieldStyle}
                  label={'Editor'}
                  variant={'filled'}
                  value={literature.editor}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  id="edition"
                  name="edition"
                  className={classes.fieldStyle}
                  label={'Edition'}
                  variant={'filled'}
                  value={literature.edition}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  id="number"
                  name="number"
                  className={classes.fieldStyle}
                  label={'Number'}
                  variant={'filled'}
                  value={literature.number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  id="series"
                  name="series"
                  className={classes.fieldStyle}
                  label={'Series'}
                  variant={'filled'}
                  value={literature.series}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <TextField
                  type="text"
                  id="volume"
                  name="volume"
                  className={classes.fieldStyle}
                  label={'Volume'}
                  variant={'filled'}
                  value={literature.volume}
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
                    {literature.author &&
                      literature.author.map((author: any) => (
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
          <Button onClick={saveLiterature} variant={'contained'} size={'large'} className={classes.formButton}>
            Submit
          </Button>
        </Grid>
      )}
      <div>{message}</div>
    </Grid>
  );
};

export default AddAnalogLiterature;

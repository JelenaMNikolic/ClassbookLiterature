import React, { useEffect, useState } from 'react';
import { getAll } from 'services/analogLitService';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';
import { AnalogLiteratureInterface } from 'models/analogLiteratureType';
import { getCurrentUser } from 'services/authService';
import { AuthorInterface } from 'models/authorType';

const useStyles = createUseStyles({
  fieldStyle: {
    marginBottom: '15px !important',
    width: '100%'
  },
  formTitle: {
    color: '#014A7C',
    textAlign: 'center'
  },
  textarea: {
    width: '100%',
    borderColor: '#e3e3e3'
  },
  tableContainer: {
    border: '1px solid #e3e3e3',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px #eeeeee'
  },
  selectedItem: {
    color: '#C63C96',
    fontWeight: 600,
    fontSize: '20px',
    marginBottom: '30px'
  },
  formButton: {
    backgroundColor: '#FDB94D !important',
    marginBottom: '30px !important'
  }
});

const ListAnalogLiterature: React.FC = () => {
  const [content, setContent] = useState([]);
  const [currentLiterature, setCurrentLiterature] = useState<any>();
  const [showEditOption, setShowEditOption] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setShowEditOption(user.roles.includes('ROLE_ADMIN'));
      console.log(showEditOption);
    }
  }, [showEditOption]);

  useEffect(() => {
    getLiterature();
  }, []);

  const getLiterature = () => {
    getAll()
      .then((response) => {
        setContent(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchParam = event.target.value;
    const currentContent = content.filter((literature: AnalogLiteratureInterface) =>
      literature.title.includes(searchParam)
    );
    if (searchParam === '') {
      getLiterature();
    }
    setContent(currentContent);
  };

  const setActiveLiterature = (book: any) => {
    setCurrentLiterature(book);
  };

  return (
    <Grid container direction={'column'} justify={'center'} alignItems={'center'}>
      <h3 className={classes.formTitle}>Books</h3>
      <div className="">
        <TextField
          type="text"
          label={'Search'}
          className={classes.fieldStyle}
          variant="outlined"
          id="name"
          name="name"
          defaultValue={''}
          onChange={handleSearchChange}
        />
      </div>
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
            {content &&
              content.map((book: any) => (
                <TableRow key={book.id} onClick={() => setActiveLiterature(book)}>
                  <TableCell>
                    <Link to={'/analog/scripts/' + book.id}>{book.title}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/analog/scripts/' + book.id}>{book.month}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/analog/scripts/' + book.id}>{book.note}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/analog/scripts/' + book.id}>{book.year}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/analog/scripts/' + book.id}>{book.publisher}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/analog/scripts/' + book.id}>{book.address}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/analog/scripts/' + book.id}>
                      {book.author.map(
                        (currentAuthor: AuthorInterface) => currentAuthor.name + ' ' + currentAuthor.surname + ','
                      )}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/analog/scripts/' + book.id}>{book.editor}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/analog/scripts/' + book.id}>{book.edition}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/analog/scripts/' + book.id}>{book.number}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/analog/scripts/' + book.id}>{book.series}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/analog/scripts/' + book.id}>{book.volume}</Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {currentLiterature && showEditOption ? (
        <Grid container direction={'column'} justify={'center'} alignItems={'center'}>
          <h4>Book</h4>
          <div>
            <div className={classes.selectedItem}>{currentLiterature.title}</div>
          </div>
          <Button variant={'contained'} size={'large'} className={classes.formButton}>
            <Link to={'/analog/scripts/' + currentLiterature.id} className="">
              Edit
            </Link>
          </Button>
        </Grid>
      ) : (
        <div>
          <br />
          <p>Please select a Book</p>
        </div>
      )}
    </Grid>
  );
};

export default ListAnalogLiterature;

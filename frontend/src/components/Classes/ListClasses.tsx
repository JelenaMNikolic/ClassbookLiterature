import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAll } from 'services/classService';
import { ClassInterface } from 'models/classTypes';
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
import { DigitalLiteratureInterface } from 'models/digitalLiteratureTypes';
import { getCurrentUser } from 'services/authService';

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

const ListClasses = () => {
  const [content, setContent] = useState([]);
  const [showEditOption, setShowEditOption] = useState(false);
  const [currentClass, setCurrentClass] = useState<ClassInterface>();
  const classes = useStyles();

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setShowEditOption(user.roles.includes('ROLE_ADMIN'));
      console.log(showEditOption);
    }
  }, [showEditOption]);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = () => {
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
    const currentContent = content.filter((classItem: ClassInterface) => classItem.name.includes(searchParam));
    if (searchParam === '') {
      getClasses();
    }
    setContent(currentContent);
  };

  const setActiveClass = (currentClass: any) => {
    setCurrentClass(currentClass);
  };

  return (
    <Grid container direction={'column'} justify={'center'} alignItems={'center'}>
      <h3 className={classes.formTitle}>Classes</h3>
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
              <TableCell>Acronym</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Faculty</TableCell>
              <TableCell>Books</TableCell>
              <TableCell>Scripts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content &&
              content.map((currentClass: any) => (
                <TableRow key={currentClass.id} onClick={() => setActiveClass(currentClass)}>
                  <TableCell>
                    <Link to={'/classes/' + currentClass.id}>{currentClass.acronym}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/classes/' + currentClass.id}>{currentClass.name}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/classes/' + currentClass.id}>{currentClass.type}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/classes/' + currentClass.id}>{currentClass.semester}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/classes/' + currentClass.id}>{currentClass.faculty.name}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/classes/' + currentClass.id}>
                      <textarea
                        className={classes.textarea}
                        readOnly={true}
                        value={currentClass.books.map((currentBook: AnalogLiteratureInterface) => currentBook.title)}
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <textarea
                      className={classes.textarea}
                      readOnly={true}
                      value={currentClass.scripts.map(
                        (currentScript: DigitalLiteratureInterface) => currentScript.title
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {currentClass && showEditOption ? (
        <Grid container direction={'column'} justify={'center'} alignItems={'center'} className="">
          <h4>Class</h4>
          <div>
            <div className={classes.selectedItem}>{currentClass.name}</div>
          </div>
          <Button variant={'contained'} size={'large'} className={classes.formButton}>
            <Link to={'/classes/' + currentClass.id} className="">
              Edit
            </Link>
          </Button>
        </Grid>
      ) : (
        <div>
          <br />
          <p>Please select a Class</p>
        </div>
      )}
    </Grid>
  );
};

export default ListClasses;

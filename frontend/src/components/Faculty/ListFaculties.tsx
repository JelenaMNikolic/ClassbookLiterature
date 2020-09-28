import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAll } from 'services/facultyService';
import { FacultyInterface } from 'models/facultyTypes';
import { ClassInterface } from 'models/classTypes';
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
import { createUseStyles } from 'react-jss';
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

const ListFaculties: React.FC = () => {
  const [content, setContent] = useState([]);
  const [currentFaculty, setCurrentFaculty] = useState<FacultyInterface>();
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
    getFaculties();
  }, []);

  const getFaculties = () => {
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
    const currentContent = content.filter((faculty: FacultyInterface) => faculty.name.includes(searchParam));
    if (searchParam === '') {
      getFaculties();
    }
    setContent(currentContent);
  };

  const setActiveFaculty = (faculty: FacultyInterface) => {
    setCurrentFaculty(faculty);
  };

  return (
    <Grid container direction={'column'} justify={'center'} alignItems={'center'}>
      <h3 className={classes.formTitle}>Faculties</h3>
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
              <TableCell>Name</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell>Classes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content &&
              content.map((faculty: FacultyInterface) => (
                <TableRow key={faculty.id} onClick={() => setActiveFaculty(faculty)}>
                  <TableCell>
                    <Link to={'/faculties/' + faculty.id}>{faculty.name}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/faculties/' + faculty.id}>{faculty.activity}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={'/faculties/' + faculty.id}>
                      <textarea
                        className={classes.textarea}
                        readOnly={true}
                        value={faculty.classes.map((currentClass: ClassInterface) => currentClass.name)}
                      />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {currentFaculty && showEditOption ? (
        <Grid container direction={'column'} justify={'center'} alignItems={'center'} className="">
          <h4>Faculty</h4>
          <div>
            <div className={classes.selectedItem}>{currentFaculty.name}</div>
          </div>
          <Button variant={'contained'} size={'large'} className={classes.formButton}>
            <Link to={'/faculties/' + currentFaculty.id} className="">
              Edit
            </Link>
          </Button>
        </Grid>
      ) : (
        <div>
          <br />
          <span>Please select a Faculty</span>
        </div>
      )}
    </Grid>
  );
};

export default ListFaculties;

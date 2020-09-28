import React, { useEffect, useState } from 'react';
import { getUserBoard } from 'services/userService';
import ListFaculties from 'components/Faculty/ListFaculties';
import ListClasses from 'components/Classes/ListClasses';
import ListAnalogLiterature from 'components/AnalogLiterature/ListAnalogLiterature';
import ListDigitalLiterature from 'components/DigitalLiterature/ListDigitalLiterature';
import { createUseStyles } from 'react-jss';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Box, Grid, Tab, Tabs } from '@material-ui/core';

const useMyStyles = createUseStyles({
  headerStyle: {
    backgroundColor: '#dcdcdc',
    '& h4': {
      letterSpacing: '1px',
      fontWeight: '400'
    }
  },
  tabsHeader: {
    position: 'relative !important',
    zIndex: '0 !important'
  },
  tabPannel: {
    width: '80%'
  }
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%'
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

const BoardUser = () => {
  const [content, setContent] = useState('');
  const classes = useMyStyles();
  const themeClasses = useStyles();
  const [value, setValue] = React.useState(0);

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
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
      <div>
        <Grid container direction={'row'} justify={'center'} alignItems={'center'} className={classes.headerStyle}>
          <h4>{content}</h4>
        </Grid>
        <Grid container direction={'row'} justify={'center'} alignItems={'center'} className={themeClasses.root}>
          <AppBar className={classes.tabsHeader} color="default" position="static">
            <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
              <Tab label="Faculties List" {...a11yProps(0)} />
              <Tab label="Classes List" {...a11yProps(1)} />
              <Tab label="Books List" {...a11yProps(2)} />
              <Tab label="Scripts List" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <ListFaculties />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ListClasses />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ListAnalogLiterature />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ListDigitalLiterature />
          </TabPanel>
        </Grid>
      </div>
    </div>
  );
};

export default BoardUser;

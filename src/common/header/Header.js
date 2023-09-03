import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import { TabContext, TabPanel } from '@mui/lab';
import { IconButton, Tab, Tabs } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import {
  NavLink
} from 'react-router-dom';
import image from '../../assets/logo.png';
import Profile from '../../screens/profile/Profile';
import ViewProfile from '../../screens/profile/ViewProfile';
import "./Header.css";

export default function Header({ loginHandler }) {

  //This js file is to design & api calls related to header section in ui screen

  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState("");
  const [value, setValue] = React.useState(1);
  let datas = {
    label: ""
  }
  const [logButtonName, setlogButtonName] = React.useState(isUserSessionAlreadyExist());


  //This function is to validate user session exists or not
  function isUserSessionAlreadyExist() {
    if (localStorage.getItem("email") !== "" && localStorage.getItem("email") !== undefined
      && localStorage.getItem("email") !== null) {
      loginHandler(true);
      return "LOGOUT";
    } else {
      loginHandler(false);
      return "LOGIN";
    }
  }

  function toggleModal() {
    // logoutUser(localStorage.getItem("userId")).then(resp => {
    //   console.log(resp);
    //   resp.json().then(data => {
    //     console.log(data);
    //   });
    // });
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.replace("/")
  }

  function toggleProfileModal() {
    //setIsProfileOpen(!isProfileOpen);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };





  //alert(selectValue);
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      //width: '300px !important',
      overflowY: 'unset'
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapProfileDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      //width: '300px !important',
      overflowY: 'unset'
    },
    '& .MuiDialogActions-root': {
      // padding: theme.spacing(1),
      // minWidth: '700px'
    },
  }));

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      border: '2px SOLID red',
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <AppBar position="fixed"  >
        <Toolbar className="toolBar" position="fixed" style={{ backgroundColor: 'black', height: '75px', width: '100%', position: 'fixed', padding: '0.5em' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <img src={image} className="img" style={{ height: '50px' }} />
          </IconButton>
          <Typography variant="h5" component="div" style={{ color: '#ffffff', fontFamily: 'monospace' }} >
            ERASMUS REGISTRATION
          </Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;

          {/* <NavLink className="navbar-item" to="/home" style={{ color: '#373C83', textDecoration: 'none' }}> */}
          {/* <Search style={{backgroundColor:'white', borderRadius:'20px'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={posts}
              defaultValue={selectValue}
             // getOptionLabel={(option) => option.label}
              onChange={(event, value) => setSelectValue(value.label)}
              sx={{ width: 700 }}
              PopperComponent={({ style, ...props }) => (
                <Popper
                  {...props}
                  style={{ ...style, height: 0 , color:'white', borderRadius:'20px'}} // width is passed in 'style' prop
                />
              )}
              style={{marginTop:'-4px', color:'white', backgroundColor:'white', borderRadius:'20px'}}
              renderInput={(params) => <TextField {...params} label="Seach post.." style={{color:'white', backgroundColor:'white  !important', borderRadius:'20px'}}/>}
            />
          </Search> */}




          <NavLink className="navbar-item" to="/home" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <IconButton>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontSize: '19px',
                color: '#ffffff',
              }}><HomeWorkIcon />&nbsp;<span>HOME</span>
              </div>
            </IconButton>
          </NavLink>
          {

            (localStorage.getItem("email") !== undefined && localStorage.getItem("email") !== null && localStorage.getItem("email").trim() !== "" && localStorage.getItem("role").trim() === "student") ? (
              <>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                <NavLink className="navbar-item" to="/application" style={{ color: '#ffffff', textDecoration: 'none' }}>
                  <IconButton>
                    &nbsp;&nbsp;
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      fontSize: '19px',
                      color: '#ffffff',
                    }}><LibraryBooksIcon />&nbsp;<span>MY APPLICATIONS</span>
                    </div>
                  </IconButton>
                </NavLink>
              </>
            ) : ""
          }

          {
            (localStorage.getItem("email") !== undefined && localStorage.getItem("email") !== null && localStorage.getItem("email").trim() !== "" && localStorage.getItem("role").trim() === "teacher") ? (
              <> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                <NavLink className="navbar-item" to="/applications" style={{ color: '#ffffff', textDecoration: 'none' }}>
                  <IconButton>
                    &nbsp;&nbsp;
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      fontSize: '19px',
                      color: '#ffffff',
                    }}><LocalPharmacyIcon />&nbsp;<span>APPLICATIONS</span>
                    </div>
                  </IconButton>
                </NavLink>

                {/* <NavLink className="navbar-item" to="/theaters" style={{ color: '#ffffff', textDecoration: 'none' }}>
<IconButton>
  &nbsp;&nbsp;
  <div style={{
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: '19px',
    color: '#ffffff',
  }}><TheatersIcon />&nbsp;<span>Theaters</span>
  </div>
</IconButton>
</NavLink> */}

              </>
            ) : ""
          }




          <div style={{ flex: '1' }}></div>
          &nbsp;&nbsp;&nbsp;
          {
            (localStorage.getItem("email") !== undefined && localStorage.getItem("email") !== null && localStorage.getItem("email").trim() !== "") ? (
              <div onClick={toggleProfileModal} style={{ cursor: 'pointer', color: '#ffffff', fontSize: '19px' }}><span> Hello {localStorage.getItem("firstname")}&nbsp;{localStorage.getItem("lastname")}!</span>&nbsp;&nbsp;</div>
            ) : ""
          }

          <Button variant="contained" style={{ backgroundColor: 'goldenrod', color: 'white' }} onClick={toggleModal} >LOGOUT</Button>


          <BootstrapProfileDialog
            onClose={toggleProfileModal}
            aria-labelledby="customized-dialog-title"
            open={isProfileOpen}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleProfileModal} className="toolHeader" style={{ textAlign: 'center', backgroundColor: '#262673', color: 'white' }}>
              PROFILE
            </BootstrapDialogTitle>
            <TabContext value={value}>
              <Tabs variant="fullWidth" value={value} onChange={handleChange} style={{ textAlign: 'center' }}>
                <Tab label="VIEW" value={1} />
                <Tab label="EDIT" value={2} />
              </Tabs>

              <TabPanel value={1} index={0}>
                <ViewProfile toggleModal={toggleProfileModal} />
              </TabPanel>

              <TabPanel value={2} index={1}>
                <Profile toggleModal={toggleProfileModal} />
              </TabPanel>

            </TabContext>

          </BootstrapProfileDialog>


        </Toolbar>
      </AppBar>
    </Box>
  );
}
import { Grid, Avatar, Snackbar, Box } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Image } from 'react-bootstrap';
import banner from '../../assets/banner.jpg';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from '../../common/header/Header';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { getAllMovies, getMovieById } from '../../util/apiCalls';
import PropTypes from 'prop-types';
import { styled, withStyles } from '@mui/material/styles';
import { FormControl, TextField } from '@mui/material';

import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
export default function Home() {

  //This js is home page, contains static data

  const [value, setValue] = React.useState(1);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const loginHandler = (value) => {
    setIsLoggedIn(value);
  }
  React.useEffect(() => {
    getLoggedInStatus();

  }, [value]);

  function toggleViewModal() {

    setIsOpen(!isOpen);
  }


  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
  
 
  React.useEffect(() => {
    
  }, [])

  function getLoggedInStatus() {
    if (localStorage.getItem("email") !== "" && localStorage.getItem("email") !== undefined
      && localStorage.getItem("email") !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      window.location.replace("/")
    }
  }
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      padding: theme.spacing(2),
      minWidth: '1000px !important',
      height: '800px'
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  const BootstrapDialogForViewMovie = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      padding: theme.spacing(2),
      minWidth: '1200px !important',
      height: '900px'
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
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



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Header loginHandler={loginHandler} />
      <br></br><br></br>
      
      <div  style={{background: "url(" + banner + ") no-repeat center center fixed", width:'100%', height:'100%'}}>
            <br></br><br></br><br></br><br></br>
            <Box style={{padding:"20px", marginTop:"30px", marginLeft:"50px", backgroundColor:"white", color:'black', width:"30%"}}>
            <h1>ERASMUS</h1>
            <br></br>
            <p>Applied 1000+ students</p>
            <Button variant='outlined' >VIEW YOUR STATUS</Button>
            </Box>
            <br></br>
            <br></br>
            <br></br>
        </div>
        <br></br> <br></br> 
        <Grid container style={{padding:"30px"}} >
        <Grid item md={6}>
          <h3>How to take part in Erasmus+</h3>
          <Typography variant='body1'>
          The 2021-2027 Erasmus+ is more inclusive, more digital, and more green. It has opportunities for all ages, and more choice for organisations.
          </Typography>
          <Button variant='outlined'> LOGIN TO GET MORE INFO</Button>
        </Grid>
        <Grid item md={6}>
        <Image src={"https://erasmus-plus.ec.europa.eu/sites/default/files/styles/eac_ratio_16_9_xl/public/2021-09/Erasmus-ALT_Child_with_tablet-H.jpg?h=188f85c2&itok=2A2SbtgX"} 
          style={{width:"80%", height:'100%'}}></Image>
        </Grid>
        </Grid>

        <br></br><br></br>



      

      <Snackbar
                style={{ whiteSpace: 'pre-wrap', width: '300px', top: '50%', bottom: '50%', left: '40%', right: '50%' }}
                autoHideDuration={3000}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "center"
                }}
                open={openSnack}
                onClose={handleSnackClose}
                message={snackMessage}
            />
    </React.Fragment>
  );
}
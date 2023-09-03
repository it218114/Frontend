import { Snackbar, Typography } from '@mui/material';
import React from 'react';
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Image, Tooltip } from 'react-bootstrap';
import { Card, Dialog, DialogTitle, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { addApplication, getAllNonPendingApplications, getAllPendingApplications, registerUser } from '../../util/apiCalls';

import './application.css';
import Header from '../../common/header/Header';

export default function Application() {

//   const getFilePluginInstance = getFilePlugin({
//     fileNameGenerator: (file) => {
//         // `file.name` is the URL of opened file
//         const fileName = "download";
//         return `/${fileName}`;
//     },
// });
//  const { Download } = getFilePluginInstance;

    const [openSnack, setOpenSnack] = React.useState(false);
    const [snackMessage, setSnackMessage] = React.useState('');
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [pendingApplications, setPendingApplications] = React.useState([]);
    const [nonPendingApplications, setNonPendingApplications] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const [gradeValue, setGradeValue] = React.useState("");
    const [gradeValueExt, setGradeValueExt] = React.useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  if(localStorage.getItem("email") !== undefined && localStorage.getItem("email") !== null && localStorage.getItem("email").trim() !== "" && localStorage.getItem("role").trim() !== "student"){
    window.location.replace("/home")
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
    const loginHandler = (value) => {
        setIsLoggedIn(value);
      }

      React.useEffect(() => {
        getAllApplicationsPending();
        getAllApplicationsNonPending();
      }, []);

    function getAllApplicationsPending(){
        getAllPendingApplications().then(resp => {
            console.log(resp);
            resp.json().then(data => {
                setPendingApplications(data);
              });
          }).catch(error => {
            console.log("login user err " + error);
          });
    }

    function getAllApplicationsNonPending(){
        getAllNonPendingApplications().then(resp => {
            console.log(resp);
            resp.json().then(data => {
                setNonPendingApplications(data);
              });
          }).catch(error => {
            console.log("login user err " + error);
          });
    }
    const handleSnackClose = () => {
        setOpenSnack(!openSnack);
    };

    function viewGrades(data, ext){
        setGradeValue(data);
        setGradeValueExt(ext);
        setShow(true);
    }

    const columns = [
        { id: 'id', label: 'ID', minWidth: 20 },
        { id: 'firstName', label: 'FIRST NAME', minWidth: 200 },
        { id: 'lastName', label: 'LAST NAME', minWidth: 200 },
        { id: 'university', label: 'UNIVERSITY', minWidth: 200 },
        { id: 'appliedOn', label: 'APPLIED ON', minWidth: 160 },
        { id: 'grades', label: 'GRADES', minWidth: 160 },
        { id: 'status', label: 'STATUS', minWidth: 120 }
        
      ];
      const rescolumns = [
        { id: 'id', label: 'ID', minWidth: 20 },
        { id: 'firstName', label: 'FIRST NAME', minWidth: 160 },
        { id: 'lastName', label: 'LAST NAME', minWidth: 160 },
        { id: 'university', label: 'UNIVERSITY', minWidth: 180 },
        { id: 'appliedOn', label: 'APPLIED ON', minWidth: 100 },
        { id: 'grades', label: 'GRADES', minWidth: 100 },
        { id: 'status', label: 'STATUS', minWidth: 100 },
        { id: 'approvalDoc', label: 'APPROVAL DOCUMENT', minWidth: 120 }
      ];
    return (
        <>
        <Header loginHandler={loginHandler} /><br></br>
                <Container fluid className='application-page'>


                     {

            (localStorage.getItem("email") !== undefined && localStorage.getItem("email") !== null && localStorage.getItem("email").trim() !== "" && localStorage.getItem("role").trim() === "student") ? (
              
                <Link className='text-warning ms-1 fw-bold' to='/create-application'><button className='apply-btn rounded float-right' style={{width: '10% !important', float: 'right' }}>APPLY NOW</button></Link>

            ):""}


                <br></br><br></br>
                <Typography color={"white"}variant='h5' style={{textAlign:'center', fontWeight:'700'}}> PENDING APPLICATIONS: </Typography>
                <Card sx={{ width: '95%', backgroundColor: 'aliceblue', color: '#566573', padding: '20px' }}>
              {pendingApplications.length > 0 ? (
               
<>
                  <TableContainer sx={{ minHeight: 250, maxHeight: 300, width: '100%' }}>
                    <Table stickyHeader aria-label="sticky table" class="min-w-max w-full table-auto " style={{width:'100%'}}>
                      <TableHead style={{ backgroundColor: '#566573', color: 'white', padding: '10px' }}>
                        <TableRow class="bg-gray-900 text-gray-500 uppercase leading-normal">
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth, backgroundColor: '#566573', color: 'white', padding: '5px' }}
                              class="py-3 px-6 text-center"
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody class="text-gray-200 bg-gray-700 text-sm font-light ">
                        {pendingApplications
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, ind) => {
                            return (
                              <TableRow role="checkbox" hover={true} tabIndex={-1} key={ind} style={{ textAlign: 'center' }}>
                                {columns.map((column) => {
                                  const id = row["id"];
                                  const gradeFileExt = row["gradeFileExt"];
                                  const value = row[column.id];
                                  return (
                                    <TableCell key={column.id} align={column.align} class="text-left whitespace-nowrap">
                                      {(column.id === 'action') ? (
                                        <><Tooltip title="Delete slot">
                                            <Button style={{ color: 'white', backgroundColor: "#566573", alignContent: 'center' }}
                                              //onClick={() => bookSlot(id)}
                                              aria-label="delete" >
                                              <BookmarkAddedIcon sx={{ fontSize: '20px' }} />BOOK
                                            </Button>
                                          </Tooltip>
                                        </>
                                      ) :
                                      (column.id === 'id') ? (
                                        value
                                        ) : (column.id === 'status') ? (
                                          <Chip label={value} style={{ backgroundColor: 'orange', color: 'white' }}></Chip>
                                        ) : (column.id === 'grades') ? (
                                          <Button onClick={() => viewGrades(value, gradeFileExt)}>VIEW</Button>
                                        ) : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={pendingApplications.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="bg-gray-900 text-white uppercase leading-normal"
                    sx={{
                      '.MuiTablePagination-toolbar': {
                          color: 'rgb(41, 39, 39)',
                          display:'flex',
                          flexWrap: 'wrap'
                      },
                      '.MuiTablePagination-select': {
                        display:'flex',
                          flexWrap: 'wrap'
                      }
                    }}
                  />

</>
              ) : <p style={{color:'red'}}>No records exists</p>}

</Card>



<br></br><br></br>
            <Typography color={"white"} variant='h5' style={{textAlign:'center', fontWeight:'700'}}> APPROVED / DECLINED APPLICATIONS: </Typography>
            <Card sx={{ width: '95%', backgroundColor: 'aliceblue', color: '#566573', padding: '20px' }}>
              {nonPendingApplications.length > 0 ? (
                <>

                  <TableContainer sx={{ minHeight: 250, maxHeight: 300, width: '100%' }}>
                    <Table stickyHeader aria-label="sticky table" class="min-w-max w-full table-auto " style={{width:'100%'}}>
                      <TableHead style={{ backgroundColor: '#566573', color: 'white', padding: '10px' }}>
                        <TableRow class="bg-gray-900 text-gray-500 uppercase leading-normal">
                          {rescolumns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth, backgroundColor: '#566573', color: 'white', padding: '5px' }}
                              class="py-3 px-6 text-center"
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody className="text-gray-200 bg-gray-700 text-sm font-light ">
                        {nonPendingApplications
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, ind) => {
                            return (
                              <TableRow role="checkbox" hover={true} tabIndex={-1} key={ind} style={{ textAlign: 'center' }}>
                                {rescolumns.map((column) => {
                                  const gradeFileExt = row["gradeFileExt"];
                                  const approvalDocExt = row["approvalDocExt"];
                                  const value = row[column.id];
                                  return (
                                    <TableCell key={column.id} align={column.align} class="text-left whitespace-nowrap">
                                      {(column.id === 'action') ? (
                                        <><Tooltip title="Delete slot">
                                            <Button style={{ color: 'white', backgroundColor: "#566573", alignContent: 'center' }}
                                              //onClick={() => bookSlot(id)}
                                              aria-label="delete" >
                                              <BookmarkAddedIcon sx={{ fontSize: '20px' }} />BOOK
                                            </Button>
                                          </Tooltip>
                                        </>
                                      ) :
                                        (column.id === 'id') ? (
                                          value
                                        ) : (column.id === 'status') ? (
                                          value==="approved" ?
                                            (<Chip label={value.toUpperCase()} style={{ backgroundColor: 'green', color: 'white' }}></Chip>)
                                            :
                                         
                                            (<Chip label={value.toUpperCase()} style={{ backgroundColor: 'red', color: 'white' }}></Chip>)
                                        ) : (column.id === 'grades') ? (
                                          <Button onClick={() => viewGrades(value, gradeFileExt)}>VIEW</Button>
                                        ) : (column.id === 'approvalDoc') ? (
                                          (value) ? (
                                          <Button onClick={() => viewGrades(value, approvalDocExt)}>VIEW</Button>
                                          ):"NA"
                                        ) : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    valign='middle'
                    component="span"
                    count={nonPendingApplications.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                      '.MuiTablePagination-toolbar': {
                          color: 'rgb(41, 39, 39)',
                          display:'flex',
                          flexWrap: 'wrap'
                      },
                      '.MuiTablePagination-select': {
                        display:'flex',
                          flexWrap: 'wrap'
                      }
                    }}
                  />

</>
              ) : <p style={{color:'red'}}>No records exists</p>}
 </Card>



                </Container>

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

<Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body style={{width:'500px', height: '500px'}}>
            {
              (gradeValueExt==="png"|| gradeValueExt==="jpg"|| gradeValueExt==="jpeg") ? (
                <img src={gradeValue}  width={"100%"} height={"100%"}></img>
            ) : (
                <div>
                 <object data={gradeValue} type="application/pdf" width="480px" height="450px"></object>
            </div>   
            )  
            }

        </Modal.Body>
        
      </Modal>
        </>
    );
};
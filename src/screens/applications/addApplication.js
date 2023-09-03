import { Snackbar } from '@mui/material';
import React from 'react';
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addApplication, registerUser } from '../../util/apiCalls';
import bsCustomFileInput from "bs-custom-file-input";
import './addApplication.css';
import Header from '../../common/header/Header';
export default function AddApplication() {
    const [openSnack, setOpenSnack] = React.useState(false);
    const [emailError, setEmailError] = React.useState('');
    const [mobileError, setMobileError] = React.useState('');
    const [cpasswordError, setcPasswordError] = React.useState('');
    const [invalidError, setInvalidError] = React.useState('');
    const [snackMessage, setSnackMessage] = React.useState('');
    const [fileName, setFileName] = React.useState("");
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const phoneChange = (event) => {
        setPhone(event.target.value);
    }

    const universityChange = (event) => {
        setUniversity(event.target.value);
    }

    const emailChange = (event) => {
        setEmail(event.target.value);
        if (!ValidateEmail(event.target.value)) {
            setEmailError('Enter valid Email!');
        } else {
            setEmailError('');
        }
    }

    const loginHandler = (value) => {
        setIsLoggedIn(value);
      }

    const nameFChange = (event) => {
        setFName(event.target.value);
    }

    const nameLChange = (event) => {
        setLName(event.target.value);
    }

    const streetChange = (event) => {
        setStreet(event.target.value);
    }

    const handleDocPathChange = (e) => {
        setFileName(e.target.files[0]);
    };

    const submitNewApplication = () => {
        console.log(email, fname, lname);
        if (email === "" || email === undefined || university === "" || university === undefined ||
            fname === "" || fname === undefined || lname === "" || lname === undefined || phone === "" || phone === undefined
            || fileName === "" || fileName === undefined || street === "" || street === undefined) {
            setSnackMessage('Please fill out this field');
            setOpenSnack(true);
        } else if (!ValidateEmail(email)) {
            setcPasswordError('Email is not valid');
            return false;
        } else if (!phonenumber(phone)) {
            setcPasswordError('Phone number should be 10 digits');
            return false;
        } else {
            addApplication(fname, lname, email, phone, street, fileName, university).then(res => {
                console.log(res)
                if (res.status===200) {
                    setFName("");
                    setLName("");
                    setEmail("");
                    setPhone("");
                    setStreet("");
                    setUniversity("");
                    setcPasswordError("");
                    setSnackMessage('Application submitted successfully!!');
                    setOpenSnack(true);
                } else {
                    res.text().then(text => {
                        let err = JSON.parse(text);
                        console.log(err);
                        setcPasswordError(err.message);
                        setSnackMessage(err.message);
                        setOpenSnack(true);
                    })
                }

            })
                .catch(error => {
                    console.log("Regiter failed" + error);
                    setInvalidError('Registration Failed!');
                })
        }
    }

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    function phonenumber(mobile) {
        var phoneno = /^\d{10}$/;
        if (mobile.match(phoneno)) {
            return true;
        }
        else {
            return false;
        }
    }
    const handleSnackClose = () => {
        setOpenSnack(!openSnack);
    };
    const [email, setEmail] = React.useState(localStorage.getItem("email"));
    const [phone, setPhone] = React.useState(localStorage.getItem("phone"));
    const [fname, setFName] = React.useState(localStorage.getItem("firstname"));
    const [lname, setLName] = React.useState(localStorage.getItem("lastname"));
    const [street, setStreet] = React.useState("");
    const [university, setUniversity] = React.useState("");
    return (
        <>
        <Header loginHandler={loginHandler} /><br></br>
                <Container fluid className='register-page'>
                <Link className='text-success ms-1 fw-bold text-decoration-none' to='/application'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                    Back</Link>
                    <div className='add-application-style mx-auto p-3'>
                        <h3 className='text-color'>APPLY FORM</h3>
                        <div>
                            <Container>
                                <Row>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="First Name"
                                            className="mb-3">
                                            <Form.Control type="name"
                                                value={fname}
                                                onChange={nameFChange}
                                                name='name' placeholder="Your First Name" required />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Email address"
                                            className="mb-3">
                                            <Form.Control type="email"
                                                value={email}
                                                onChange={emailChange}
                                                name='email' placeholder="name@example.com" required />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="University"
                                            className="mb-3">
                                            <Form.Control type="text"

                                                value={university}
                                                onChange={universityChange}
                                                name='name' placeholder="University" required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Last Name"
                                            className="mb-3">
                                            <Form.Control type="name"
                                                value={lname}
                                                onChange={nameLChange}
                                                name='name' placeholder="Your Last Name" required />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Phone number"
                                            className="mb-3">
                                            <Form.Control type="number"
                                                value={phone}
                                                onChange={phoneChange}
                                                name='Phone number' placeholder="name@example.com" required />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Street Address"
                                            className="mb-3">
                                            <Form.Control type="text"

                                                value={street}
                                                onChange={streetChange}
                                                name='name' placeholder="Street" required />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                


                                <label style={{color:'white'}}> Upload your grades(PDF / IMAGE):<br></br>
                                    <input id="file-input" type="file" accept="application/pdfimage/jpeg,image/gif,image/png,application/pdf,image/x-eps" class="hidden" onChange={handleDocPathChange} />
                                </label>                             <span style={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                }}>{cpasswordError}</span>
                                <button className='w-100 mt-3 login-btn rounded' onClick={submitNewApplication}>SUBMIT</button>
                            </Container>





                        </div>
                    </div>
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
        </>
    );
};
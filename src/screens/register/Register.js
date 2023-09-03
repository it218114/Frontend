import { Snackbar } from '@mui/material';
import React from 'react';
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { registerUser } from '../../util/apiCalls';
import './Register.css';
const Register = () => {
    const [openSnack, setOpenSnack] = React.useState(false);
    const [emailError, setEmailError] = React.useState('');
    const [mobileError, setMobileError] = React.useState('');
    const [cpasswordError, setcPasswordError] = React.useState('');
    const [invalidError, setInvalidError] = React.useState('');
    const [snackMessage, setSnackMessage] = React.useState('');
    const passwordChange = (event) => {
        setPassword(event.target.value);
    }

    const phoneChange = (event) => {
        setPhone(event.target.value);
    }

    const cpasswordChange = (event) => {
        setCPassword(event.target.value);
    }

    const emailChange = (event) => {
        setEmail(event.target.value);
        if (!ValidateEmail(event.target.value)) {
            setEmailError('Enter valid Email!');
        } else {
            setEmailError('');
        }
    }

    const nameFChange = (event) => {
        setFName(event.target.value);
    }

    const nameLChange = (event) => {
        setLName(event.target.value);
    }

    const roleChange = (event) => {
        setRole(event.target.value);
    }

    const clickRegister = () => {
        console.log(email, fname, lname, role, password);
        if (email === "" || email === undefined || password === "" || password === undefined ||
            fname === "" || fname === undefined || lname === "" || lname === undefined ||
            role === "" || role === undefined || phone === "" || phone === undefined) {
            setSnackMessage('Please fill out this field');
            setOpenSnack(true);
        } else if (!ValidateEmail(email)) {
            setcPasswordError('Email is not valid');
            return false;
        } else if (!phonenumber(phone)) {
            setcPasswordError('Phone number should be 10 digits');
            return false;
        } else if (password != cpassword) {
            setcPasswordError('Password mismatched!');
            return false;
        } else {
            registerUser(fname, lname, email, password, phone, role).then(res => {
                console.log(res)
                if (res.ok) {
                    setFName("");
                    setLName("");
                    setEmail("");
                    setPassword("");
                    setPhone("");
                    setRole("");
                    setCPassword("");
                    setcPasswordError("");
                    setSnackMessage('Registration success!, Please log in');
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
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [cpassword, setCPassword] = React.useState("");
    const [fname, setFName] = React.useState("");
    const [lname, setLName] = React.useState("");
    const [role, setRole] = React.useState("");
    return (
        <>
            <div  className="register-pages">
                <Container fluid >
                    <div className='register-styles mx-auto p-2'>
                        <h3 className='text-color'>Create a New Account</h3>
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
                                            label="Password"
                                            className="mb-3">
                                            <Form.Control type="password"
                                                value={password}
                                                onChange={passwordChange}
                                                name='name' placeholder="Password" required />
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
                                            label="Confirm Password"
                                            className="mb-3">
                                            <Form.Control type="password"

                                                value={cpassword}
                                                onChange={cpasswordChange}
                                                name='name' placeholder="Confirm Password" required />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                <FloatingLabel controlId="floatingInput" label="Select Roles">
                                    <Form.Select
                                        value={role}
                                        onChange={roleChange}>
                                        <option disabled selected value=""> Select Roles</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="student">Student</option>
                                        {/* <option value="admin">admin</option> */}
                                    </Form.Select>
                                </FloatingLabel>
                                <span style={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                }}>{cpasswordError}</span>
                                <button className='w-100 mt-3 login-btn rounded' onClick={clickRegister}>Register</button>
                            </Container>





                        </div>
                        <p className='text-start m-2 text-color'>Already have an account?<Link className='text-warning ms-1 fw-bold' to='/login'>Sign In</Link> </p>

                    </div>
                </Container>
            </div>

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

export default Register;
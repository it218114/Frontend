import { Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { loginUser } from '../../util/apiCalls';
import './Login.css';
const Login = ({ toggleModal, loginButton }) => {
    const [openSnack, setOpenSnack] = React.useState(false);
    const [lusername, setLUsername] = React.useState("");
    const [lpassword, setLPassword] = React.useState("");
    const [invalidError, setInvalidError] = React.useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [snackMessage, setSnackMessage] = React.useState('');
    const handleSnackClose = () => {
        setOpenSnack(!openSnack);
    };
    const lpasswordChange = (event) => {
        setLPassword(event.target.value);
    }

    const lusernameChange = (event) => {
        setLUsername(event.target.value);
    }
    const clickLogin = () => {
        if (lusername === "" || lusername === undefined || lpassword === "" || lpassword === undefined) {
            setSnackMessage('Please fill out this field');
            setOpenSnack(true);
        } else {
            loginUser(lusername, lpassword).then(resp => {
                console.log(resp);
                resp.json().then(data => {
                    console.log(data);

                    if (data !== null && data.email !== undefined && data.email !== "" && data.email !== "undefined"
                        && data.email !== null) {
                        localStorage.setItem("firstname", data.firstName);
                        localStorage.setItem("lastname", data.lastName);
                        localStorage.setItem("email", data.email);
                        localStorage.setItem("phone", data.phone);
                        localStorage.setItem("userId", data.id);
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("role", data.role);

                        window.location.replace("/home")
                    } else {
                        setInvalidError('Invalid credentials!');
                    }
                });
            }).catch(error => {
                console.log("login user err " + error);
            })
        }
    }
    return (
        <>
            <div className="login-style-div">
                <Container fluid>
                    <div className="login-style">
                        <h3 className='text-center'>Login</h3>
                        <div className='w-75 mx-auto form-style'>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    defaultValue={lusername}
                                    onBlur={lusernameChange}
                                    id="floatingInputCustom"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                />
                                <label htmlFor="floatingInputCustom">Email address</label>
                            </Form.Floating>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    id="floatingPasswordCustom"
                                    type="password"
                                    defaultValue={lpassword}
                                    onBlur={lpasswordChange}
                                    placeholder="Password"
                                    required
                                />
                                <label htmlFor="floatingPasswordCustom">Password</label>
                            </Form.Floating>
                            <p className='text-danger mb-0 pb-0'><small>{invalidError}</small></p>

                            <button className='w-100 login-btn rounded' onClick={clickLogin} type="submit">
                                Login
                            </button>
                            <p className='text-start mt-2 text-color'>Don't have an account? <Link className='text-warning ms-1 fw-bold' to='/register'>Sign Up</Link></p>
                        </div>
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

export default Login;
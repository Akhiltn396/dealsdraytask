import "./Login.css";
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [error, setError] = useState(null)
    const loginSchema = yup.object().shape({
        username: yup.string().min(4).max(12).required("Please enter fullname"),
        password: yup.string().min(4).max(12).required("Please enter password"),
    });
    const navigate = useNavigate();


    const handleLogin = async (values) => {
        try {
            const username = values?.username;
            const password = values?.password;

            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                { username, password },
                {
                    withCredentials: true,
                }
            );
            console.log(res);
            sessionStorage.setItem('username', res?.data?.details?.username);

            //   dispatch(loginSuccess({ payload: res?.data?.details }));  
            navigate("/");
            // window.location.reload(); 
        } catch (error) {
            console.log(error);
            if (error) {
                setError("Invalid Login Credentials")
            }
        }
    };



    return (
        <div className="login">
            <div className="left">
                <img className="loginImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK9pIsCYx9Z9wPHyN-qDcqJMUALTYV0phaxw&s" alt="" />
            </div>
            <div className="right">
                <h1>Sign In</h1>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={loginSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        handleLogin(values)

                    }}

                >
                    {({ errors, touched }) => (
                        <Form className="forms">
                            <label htmlFor="username">Username</label>
                            <Field name="username" className="input" />
                            {errors.username && touched.username ? (
                                <div className="error">{errors.username}</div>
                            ) : null}
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className="input" />
                            {errors.password && touched.password ? (
                                <div className="error">{errors.password}</div>
                            ) : null}
                            <div className="err">{error}</div>
                            <button type="submit" className="btn" >Login</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
export default Login
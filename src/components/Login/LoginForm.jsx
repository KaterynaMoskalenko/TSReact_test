import React, { useState } from "react";
//import { useDispatch } from "react-redux";
//import { login } from '../../store/authSlice'
import { useNavigate } from "react-router";
import './LoginForm.scss';
// import {  useSelector } from "react-redux";

import  { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../store/authSlice";



// const LoginForm = () => {

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (username === "admin" && password === "admin") {
//       dispatch(login({username, password})); 
//       navigate("/"); 
//     } else {
//       setError("Неправильный логин или пароль!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Authorization</h2>
//       <form onSubmit={handleSubmit} className="login-form">
//         <input type="text" placeholder="Login" value={username} onChange={(e) => setUsername(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit">Login</button>
//         {error && <p className="error-message">{error}</p>}
//       </form>
//     </div>
//   );


// };

// export default LoginForm;

// LoginForm.jsx


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  // При изменении состояния пользователя выполняем перенаправление
  useEffect(() => {
  if (user) {
    if (user.role === 'admin') {
      navigate('/admin');
    } else if (user.role === 'manager') {
      navigate('/manager');
    } else if (user.role === 'user') { // Новый случай для обычного пользователя
      navigate('/user');
    } else {
      navigate('/');
    }
  }
}, [user, navigate]);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  return (
    <div>
      <h2>Autorization</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(loginUser(values))
            .unwrap()
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Name user:</label>
              <Field type="text" name="username" id="username" />
              <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="password">Password user:</label>
              <Field type="password" name="password" id="password" />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>
            <button className="btnAuth" type="submit" disabled={isSubmitting || loading}>
              {loading ? 'Loading...' : 'Enter'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
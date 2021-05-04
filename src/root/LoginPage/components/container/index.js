// Render Prop
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Redirect } from "react-router-dom";

const Container = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const onSubmit = (values, formikbag) => {
    // pass email, password to api
    // api will return a token
    // set token to session storage
    // if all successfull move to Chat Page for a user.
    localStorage.setItem("Authentication-Token", "ABCDEFGH");
    setLoggedIn(true);
  };

  if (loggedIn) {
    return <Redirect to="/user/token" />;
  } else {
    return (
      <div>
        <h1>Hello User, Please Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Log In
              </button>
            </Form>
          )}
        </Formik>
        <div>
          If not a User <a href="/signup">Sign Up</a>
        </div>
      </div>
    );
  }
};

export default Container;

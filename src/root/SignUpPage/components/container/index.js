// Render Prop
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Redirect } from "react-router-dom";

const Container = () => {
  const [signedUp, setSignedUp] = useState(false);

  const onSubmit = (values, formikbag) => {
    // pass email, password to api
    // api will return a token
    // set token to session storage
    // if all successfull move to Chat Page for a user.
    localStorage.setItem("Authentication-Token", "ABCDEFGH");
    setSignedUp(true);
  };

  if (signedUp) {
    return <Redirect to="/user/token" />;
  } else {
    return (
      <div>
        <h1>Hello New User, Fill out the below details</h1>
        <Formik
          initialValues={{ email: "", password: "", confirm_password: "" }}
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
            if (!values.confirm_password) {
              errors.confirm_password = "Required";
            } else if (values.password !== values.confirm_password) {
              errors.confirm_password = "Passwords do not match";
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
              <label>Confirm Password</label>
              <Field type="text" name="confirm_password" />
              <ErrorMessage name="confirm_password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
};

export default Container;

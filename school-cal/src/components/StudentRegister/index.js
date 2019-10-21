import React, { useContext, useEffect } from "react";

import { AuthContext } from "../../contexts/auth/authState";
import { Formik } from "formik";
import StudentRegisterForm from "./StudentRegisterForm";
import * as Yup from "yup";

import { app, db } from "../../firebase/index";

const StudentRegister = ({ history }) => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const {
    currentUser,
    isLoading,
    signUpError,
    signUpUser,
    signInWithGoogle
  } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      history.push("/student-dashboard");
    }
  }, [currentUser]);

  const StudentRegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First name must be greater than 2 characters.")
      .max(50, "First name must be lesser 50 characters.")
      .required("First name is required."),
    lastName: Yup.string()
      .min(2, "Last name must be between 2 and 50 characters.")
      .max(50, "Last name must be between 2 and 50 characters.")
      .required("Last name is required."),
    email: Yup.string()
      .email("Invalid email.")
      .required("Email is required."),
      phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required("A phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .max(32, "Password must be less than 32 characters.")
      .required("Password is required.")
  });

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone:"",
          password: "",
        }}
        onSubmit={(values, actions) => {
          signUpUser(values);
          actions.resetForm();
        }}
        render={formikProps => (
          <StudentRegisterForm
            {...formikProps}
            isLoading={isLoading}
            signUpError={signUpError}
            signInWithGoogle={signInWithGoogle}
          />
        )}
        validationSchema={StudentRegisterSchema}
      />
    </>
  );
};

export default StudentRegister;


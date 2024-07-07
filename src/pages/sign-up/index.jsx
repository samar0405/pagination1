import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "@service";
import SignUpModal from "../../components/modal/sign-up-modal";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  full_name: Yup.string().required("Full name is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{7,}$/,
      "Password must contain at least 7 characters, one uppercase and one lowercase letter"
    )
    .required("Password is required"),
  phone_number: Yup.string()
    .matches(
      /^(?:\+998)?\d{9}$/,
      "Phone number must be a valid Uzbekistan phone number"
    )
    .required("Phone number is required"),
});

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.sign_up(values);
      if (response.status === 200) {
        setModal(true);
        localStorage.setItem("email", values.email);
        toast.success("Successfully registered!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to register. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setModal(false);
    navigate("/");
  };

  return (
    <>
      <SignUpModal open={modal} toggle={handleModalClose} />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5 bg-white shadow-md rounded-lg">
          <h1 className="text-center my-6 text-[40px]">Register</h1>
          <Formik
            initialValues={{
              email: "",
              full_name: "",
              password: "",
              phone_number: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-6">
                <Field name="email">
                  {({ field, meta }) => (
                    <div>
                      <TextField
                        {...field}
                        type="email"
                        fullWidth
                        label="Email"
                        error={meta.touched && Boolean(meta.error)}
                      />
                      {meta.touched && meta.error && (
                        <FormHelperText error>{meta.error}</FormHelperText>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="full_name">
                  {({ field, meta }) => (
                    <div>
                      <TextField
                        {...field}
                        type="text"
                        fullWidth
                        label="Full Name"
                        error={meta.touched && Boolean(meta.error)}
                      />
                      {meta.touched && meta.error && (
                        <FormHelperText error>{meta.error}</FormHelperText>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="password">
                  {({ field, meta }) => (
                    <div>
                      <TextField
                        {...field}
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        label="Password"
                        error={meta.touched && Boolean(meta.error)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {meta.touched && meta.error && (
                        <FormHelperText error>{meta.error}</FormHelperText>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="phone_number">
                  {({ field, meta }) => (
                    <div>
                      <TextField
                        {...field}
                        type="text"
                        fullWidth
                        label="Phone Number"
                        error={meta.touched && Boolean(meta.error)}
                      />
                      {meta.touched && meta.error && (
                        <FormHelperText error>{meta.error}</FormHelperText>
                      )}
                    </div>
                  )}
                </Field>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Index;

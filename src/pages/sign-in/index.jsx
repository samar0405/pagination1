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
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{7,}$/,
      "Password must contain at least 7 characters, one uppercase and one lowercase letter"
    )
    .required("Password is required"),
});

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.sign_in(values);
      if (response) {
        localStorage.setItem("access_token", response?.data?.access_token);
        toast.success("Successfully signed in!");
        setTimeout(() => {
          navigate("/main");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to sign in. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  const moveRegister = () => {
    navigate("/sign-up");
  };
  const moveForgot = () => {
    navigate("/forgot");
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5 bg-white shadow-md rounded-lg">
          <h1 className="text-center my-6 text-[40px]">Login</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
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
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign In
                </Button>
                <div className="flex items-center justify-between text-blue-400">
                  <a className="underline" href="#" onClick={moveRegister}>
                    Register
                  </a>
                  <a className="underline" href="#" onClick={moveForgot}>
                    Forgot password?
                  </a>
                </div>
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

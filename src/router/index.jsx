import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import { SignIn, SignUp, Forgot, Main, Orders, Services } from "@pages";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="main/*" element={<Main />}>
          <Route index element={<Orders />} />
          <Route path="services" element={<Services />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Index;

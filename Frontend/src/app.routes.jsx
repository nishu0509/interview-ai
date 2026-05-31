import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";

import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import InterviewUIPage from "./features/interview/pages/InterviewUIPage";

export const router = createBrowserRouter([

  {
    path: "/",
    element: <Navigate to="/login" />
  },

  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/register",
    element: <Register />
  },

  {
    path: "/home",
    element: (
      <Protected>
        <Home />
      </Protected>
    )
  },

  {
    path: "/ui",
    element: (
      <Protected>
        <InterviewUIPage />
      </Protected>
    )
  },

  {
    path: "/interview/:interviewId",
    element: (
      <Protected>
        <Interview />
      </Protected>
    )
  },

  {
    path: "/interview123",
    element: <InterviewUIPage />
  }

]);
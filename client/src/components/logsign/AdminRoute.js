import React from 'react'

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextlog";

export default function AdminRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser.email === "admin@gmail.com" ? children : <Navigate to="/" />;
}

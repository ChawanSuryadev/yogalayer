import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProtectedRoute({ user, children }) {
  const location = useLocation();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error("Please login to continue");
      // Delay redirect so toast has time to appear
      setTimeout(() => setRedirect(true), 500);
    }
  }, [user]);

  if (!user) {
    if (redirect) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
    return null; // wait before redirecting
  }

  return children;
}
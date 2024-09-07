import { Children } from "react"; // This import is unnecessary and can be removed.
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation(); // `useLocation` should be invoked as a function.

  // If the user is not authenticated and tries to access any page other than login or register, redirect to login.
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // If the user is authenticated and tries to access login or register pages, redirect based on their role.
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // If the authenticated user is not an admin but tries to access an admin page, redirect to an unauthorized page.
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />; // Added `/` at the beginning of the path to ensure it's treated as an absolute path.
  }

  // If the authenticated user is an admin but tries to access a shop page, redirect to the admin dashboard.
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // If none of the above conditions are met, render the children components.
  return <>{children}</>;
}

export default CheckAuth;

import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("Authentication-Token");

    if (token) {
      console.log("Hello from Private Route", token);
      return true;
    }
    return false;
  };

  return isAuthenticated() ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
};

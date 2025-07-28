import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please sign in first.");
    return <Navigate to="/signin" />;
  }

  if (user.role !== "admin") {
    alert("Access denied. Admins only.");
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAdmin;

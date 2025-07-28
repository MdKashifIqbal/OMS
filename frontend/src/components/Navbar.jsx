import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/order" className="hover:underline">
          Orders
        </Link>
        <Link to="/admin" className="hover:underline">
          Admin
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/signin")}
              className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email) return alert("Email is required");

    try {
      // Fetch all users from backend
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`);
      const users = await res.json();

      const user = users.find((u) => u.email === email);

      if (!user) {
        return alert("User not found. Please sign up.");
      }

      localStorage.setItem("user", JSON.stringify(user)); // Store logged-in user
      navigate("/");
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSignIn}
        className="bg-white p-6 rounded shadow w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-blue-600 text-white w-full p-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;

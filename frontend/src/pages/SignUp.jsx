import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
  e.preventDefault();

  if (!email) return alert("Email is required");

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }), // Add more fields if required
    });

    if (!res.ok) {
      const errorData = await res.json();
      return alert(errorData.message || "Signup failed");
    }

    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user)); // Optional, for session
    navigate("/");
  } catch (err) {
    console.error("Signup error:", err);
    alert("Something went wrong");
  }
};


  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSignUp} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-blue-600 text-white w-full p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

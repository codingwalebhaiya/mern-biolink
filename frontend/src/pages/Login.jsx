import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const { login, error, clearErrors, loading, navigate } = useAuth();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(formData);

    if (error) {
      clearErrors();
    }
  };

  {
    error && <div className="error">{error}</div>;
  }
  return (
    <div>
      <NavLink
        className="mt-2 px-4 py-2 font-bold text-xl border-b-blue-700 border-b-2"
        to="/"
      >
        Home
      </NavLink>

      <div className="flex items-center justify-center mx-auto max-h-screen">
        <div className=" flex flex-col items-center max-w-md mx-auto mt-10 p-6 border rounded shadow">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          <form onSubmit={submitHandler} className="space-y-4 ">
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              placeholder="Username or Email"
              required
              onChange={changeHandler}
              className="w-full p-2 border rounded"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              required
              onChange={changeHandler}
              className="w-full p-2 border rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 p-2 w-full rounded text-white hover:bg-blue-700"
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </form>

          <p className="text-sm mt-4">
            Don’t have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-blue-700 cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>{" "}
        {/* <div className="flex items-center justify-center mt-4">
        <button onClick={() => logout()}>Logout</button>
      </div> */}
      </div>
    </div>
  );
};

export default Login;

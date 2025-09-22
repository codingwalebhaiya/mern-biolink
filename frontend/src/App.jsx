import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import PrivateRoute from "./components/routing/PrivateRoute";
import PublicProfile from "./pages/PublicProfile";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Public profile by username (linktree style) */}
         <Route path="/:username" element={<PublicProfile />} /> 

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;

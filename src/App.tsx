import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/Register";
import { SignIn } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Dashboard/profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <div className="font-poppins">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;

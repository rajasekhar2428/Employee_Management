import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import AddUsers from "./users/AddUsers";
import EditUsers from "./users/EditUser";
import ViewUsers from "./users/ViewUsers";
import Login from "./LoginPage/login";
import Landing from "./pages/Landing";
import SignUp from "./LoginPage/SignUp";
import { useLocation } from "react-router-dom";
function App() {
  return (
    <div className="App">
      
      <Router>
        
        <Routes>
          
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<ProtectedRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}
function ProtectedRoutes() {
  const loc = useLocation();
  const hidenav = loc.pathname === "/signup" || loc.pathname === "/login";
  return (
    <>
      
      <Navbar hide={hidenav} />
      <Routes>
        
        <Route path="/home" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/adduser" element={<AddUsers />} />
        <Route path="/edituser/:id" element={<EditUsers />} />
        <Route path="/viewuser/:id" element={<ViewUsers />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
export default App;

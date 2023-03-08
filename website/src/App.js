import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Profile from "./pages/profile";
import YourBlogs from "./pages/yourBlogs";
import CreateBlog from "./pages/createBlog";

export default function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="blogs">
          <Route index element={<YourBlogs />} />
          <Route path="create" element={<CreateBlog />} />
        </Route>
        {/* <Route path="manageblogs" element={<CreateBlog />} /> */}
      </Routes>
    </div>
  );
}

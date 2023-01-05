import Home from "./home/home";
import { Navbar } from "../components";
import { Routes, Route } from 'react-router-dom';
import Booking from "../containers/booking/booking";
import SignIn from "./sign-in/sign-in";
import Myaccount from "./myaccount/myaccount";
import LoginPanel from "./login/login";
import RegistrationPanel from "./register/register";

function Layout() {
  return (
      <Routes>
        <Route path="/car-rental-froncik" element={<Navbar />}>
          <Route index element={<Home />} />
          {/* <Route path="/" element={<Home/>} /> */}
          <Route path="login" element={<LoginPanel />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="register" element={<RegistrationPanel/>} />
          <Route path="myaccount" element={<Myaccount />} />
          <Route path="booking" element={<Booking />} />
        </Route>
       
      </Routes>
  );
}
export default Layout;

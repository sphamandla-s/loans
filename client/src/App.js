import React from "react";
import {SignUp, holdUser} from "./components/register";
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements, Link, Outlet, RouterProvider } from "react-router-dom"
import Home from "./components/home.jsx";
import LogIn from './components/login.jsx';
import Pay from './components/pay.jsx';
import {Statements, dataLoader} from "./components/statemants.jsx";
import Take from './components/take.jsx'
import './index.css';


function App(props) {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} >
        <Route index element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/statements" element={<Statements />} loader={dataLoader} />
        <Route path="/Take" element={<Take />} />
        <Route path="/register" element={<SignUp />} loader={holdUser}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  );
}


const Root = () => {
  return (
    <>
      {/* <div>
        <Link to='home'>Home</Link>
        <Link to='register'>Home</Link>
        <Link to='statements'>Home</Link>
      </div> */}
      <Outlet />
    </>
  )
}

export default App;

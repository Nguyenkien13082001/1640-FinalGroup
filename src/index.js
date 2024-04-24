import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Page/Login";
import Home from "./Page/Home";
import CreatTopic from "./Page/CreatTopic";
import Profile from "./Page/Profile";
import Event from "./components/Listevent/Event";
import ListEvent from "./Page/ListEvent";
import Post from "./components/Listpost/Post";
import ViewEvent from "./components/Listevent/ViewEvent";
import ViewPost from "./Page/ViewPost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Guest from "./Page/Guest";
import LayoutHome from "./layouts/LayoutHome";
import PendingPage from "./Page/PendingPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Login />} />
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="creattopic" element={<CreatTopic />} />
        <Route path="profile" element={<Profile />} />
        <Route path="home" element={<Home />} />
        <Route path="ListEvent" element={<ListEvent />} />
        <Route path="ListPost" element={<Post />} />
        <Route path="Pending" element={<PendingPage />} />
        <Route path="ViewEvent/:param" element={<ViewEvent />} />

        {/* <Route path="Viewpost/:param" element={<ViewPost />} /> */}
        {/* <Route
          path="Viewpost/:param"
          element={
            <>
              <LayoutHome>
                <ViewPost></ViewPost>
              </LayoutHome>
            </>
          }
        /> */}
        <Route path="Guest" element={<Guest />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

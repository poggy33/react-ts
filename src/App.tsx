import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import News from "./components/News";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "./hooks"; //redux
import { addAllPosts } from "./store/postSlice"; //redux

interface Posts {
  posts: [];
}

async function getPosts(): Promise<Posts> {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const response = await axios.get<Posts>(url);
  return response.data;
}

const App: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const dispatch = useAppDispatch(); //redux

  useEffect(() => {
    (async () => {
      const posts = await getPosts();
      if (Array.isArray(posts)) {
        const newPosts = posts.map((post: any) => {
          post.title = post.title.charAt(0).toUpperCase() + post.title.slice(1);
          post.body = post.body.charAt(0).toUpperCase() + post.body.slice(1);
          if (post.userId === 1) {
            post.isVisible = true;
          } else {
            post.isVisible = false;
          }
          return post;
        });
        dispatch(addAllPosts(newPosts)); //redux
      }
    })();
  }, []);

  //local storage
  useEffect(() => {
    let userPassword = localStorage.getItem("admin");
    if (userPassword === "12345") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <HashRouter>
      <Navbar
        matches={matches}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} />} />
        <Route
          path="/login"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          }
        />
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default App;

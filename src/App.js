import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import Nav from "./components/Navbar";
import { Button, chakra, useColorMode } from "@chakra-ui/react";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Loaader from "./components/Loaader";
import { FaArrowCircleUp } from "react-icons/fa";

const CFaArrowCircleUp = chakra(FaArrowCircleUp);

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchFound, setSearchFound] = useState(false);
  const [dataFetched, setDataFetched] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [searchUrl, setSearchUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [gusername, setgUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setgUsername(user.user.username);
    }
  }, []);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  window.addEventListener("scroll", toggleVisible);
  // if (loggedIn) {
  //   return redirect("/");
  // }

  return (
    <>
      <BrowserRouter>
        <Nav
          toggleColorMode={toggleColorMode}
          colorMode={colorMode}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          gusername={gusername}
          setgUsername={setgUsername}
        />
        {showLoader ? <Loaader /> : null}
        {visible ? (
          <Button
            position="fixed"
            bottom={100}
            right={100}
            backgroundColor="blue.400"
          >
            <CFaArrowCircleUp
              onClick={scrollToTop}
              style={{ display: visible ? "inline" : "none" }}
            />
          </Button>
        ) : null}

        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchUrl={searchUrl}
                setSearchUrl={setSearchUrl}
                dataFetched={dataFetched}
                setDataFetched={setDataFetched}
                searchFound={searchFound}
                setSearchFound={setSearchFound}
                setShowLoader={setShowLoader}
              />
            }
          />
          {!loggedIn ? (
            <Route
              path="/register"
              element={
                <Register
                  setLoggedIn={setLoggedIn}
                  setgUsername={setgUsername}
                  loggedIn={loggedIn}
                />
              }
            />
          ) : null}
          {!loggedIn ? (
            <Route
              path="/login"
              element={
                <Login
                  setLoggedIn={setLoggedIn}
                  setgUsername={gusername}
                  loggedIn={loggedIn}
                />
              }
            />
          ) : null}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

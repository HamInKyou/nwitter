import React, { useState, useEffect } from "react";
import Router from "components/Router";
import { authService } from "firebaseInstance";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <Router isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing...."
      )}
      <footer>&copy; {new Date().getFullYear()} Nweitter</footer>
    </>
  );
}

export default App;

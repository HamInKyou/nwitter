import React, { useState, useEffect } from "react";
import Router from "components/Router";
import { authService } from "firebaseInstance";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <Router isLoggedIn={isLoggedIn} /> : "Initializing...."}
      <footer>&copy; {new Date().getFullYear()} Nweitter</footer>
    </>
  );
}

export default App;

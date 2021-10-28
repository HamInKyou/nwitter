import React, { useState, useEffect } from "react";
import Router from "components/Router";
import { authService } from "firebaseInstance";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <Router userObj={userObj} /> : "Initializing...."}
      <footer>&copy; {new Date().getFullYear()} Nweitter</footer>
    </>
  );
}

export default App;

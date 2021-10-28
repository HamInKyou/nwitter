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
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const newUser = authService.currentUser;
    setUserObj({
      uid: newUser.uid,
      displayName: newUser.displayName,
    });
  };

  return (
    <>
      {init ? (
        <Router userObj={userObj} refreshUser={refreshUser} />
      ) : (
        "Initializing...."
      )}
      <footer>&copy; {new Date().getFullYear()} Nweitter</footer>
    </>
  );
}

export default App;

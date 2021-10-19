import React, { useState } from "react";
import Router from "components/Router";
import { authService } from "firebaseInstance";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <Router isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nweitter</footer>
    </>
  );
}

export default App;

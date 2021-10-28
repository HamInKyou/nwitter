import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

function Router({ userObj }) {
  return (
    <HashRouter>
      {userObj && <Navigation userObj={userObj} />}
      <Switch>
        {userObj ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </HashRouter>
  );
}

export default Router;

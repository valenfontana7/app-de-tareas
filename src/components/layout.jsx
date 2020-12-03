import React from "react";
import Header from "./header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ListNotes from "./listNotes";

function Layout() {
  return (
    <div>
      <Header />
      <Router>
        <Route path="/notas">
          <ListNotes />
        </Route>
      </Router>
    </div>
  );
}
export default Layout;

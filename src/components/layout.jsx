import React from "react";
import Header from "./header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ListNotes from "./listNotes";
import NewNote from './newNote';
import Home from './home';

function Layout() {
  return (
    <div>
      <Header />
      <Router>
        <Route exact={true} path='/'>
          <Home/>
        </Route>
        <Route exact={true} path="/notas">
          <ListNotes />
        </Route>
        <Route exact={true} path='/notas/new'>
          <NewNote />
        </Route>
      </Router>
    </div>
  );
}
export default Layout;

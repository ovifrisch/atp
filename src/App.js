import React from 'react';
import './App.css';
import Header from "./components/Header"
import MainPage from "./components/MainPage/MainPage"
import Head2Head from "./components/Head2Head/Head2Head"
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom'

function App() {
  return (
    <div id="the_app">
      <Header />
      <HashRouter>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/h2h" component={Head2Head} />
        </Switch>
      </HashRouter>
    </div>

  );
}

export default App;

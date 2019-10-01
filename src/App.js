import React, { Component } from 'react';
import './App.css';
import Movies from './components/Movies/Movies';
import Genres from './components/Genres/Genres';
import Actors from './components/Actors/Actors';
import { Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Movies
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/genres">
              Genres
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/actors">
              Actors
            </Link>
          </li>
        </ul>
      </nav>

      <main className="container">

        <Switch>
          <Route exact path="/" component={Movies} />
          <Route path="/genres" component={Genres} />
          <Route path="/actors" component={Actors} />
          
        </Switch>
      </main>
    </React.Fragment>
  );
}
}

export default App;

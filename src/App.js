import React, { Component } from 'react';
import './App.css';
import Movies from './components/Movies/Movies';
import Genres from './components/Genres/Genres';
import Actors from './components/Actors/Actors';
import Navbar from './components/Navbar/Navbar';
import { Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
      <Navbar/>

      <main className="container">

        <Switch>
          <Route exact path="/" component={Movies} />
          <Route path="/genres" component={Genres} />
          <Route path="/actors" component={Actors} />
          
        </Switch>
      </main>
    </div>
  );
}
}

export default App;

import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react' 

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddContact from './components/AddContact';
import ListContact from './components/ListContact';
import EditContact from './components/EditContact';

function App() {

  useEffect(() => {
    document.title = "Contact Book"
  }, [])

  return (
    <div className="App">
      <h2>Contact Book</h2>
      <hr />
      <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navheader"> 
              <div className="collapse navbar-collapse">
                <ul className="nav nav-tabs">
                  <li className="nav-item active">
                    <Link to={'/ListContact'} className="nav-link">List Contact</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/AddContact'} className="nav-link">Add Contact</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <br/>
            <Switch>
              <Route exact path='/AddContact' component={AddContact}/>
              <Route exact path='/ListContact' component={ListContact}/>
              <Route exact path='/EditContact/:id' component={EditContact}/>
            </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;

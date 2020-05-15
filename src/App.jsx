import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/login">
              <Login />
          </Route>
          <Route path="/admin">
              Ruta de administracion
          </Route>
          <Route path="/" exact>
              Ruta de inicio
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;

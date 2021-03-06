import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Admin from './components/Admin';
import ResetPass from './components/ResetPass';
import { auth } from './firebase';

const App = () => {

  const [firebaseUser, setFirebaseUser] = React.useState(false);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
        console.log(user)
        if(user){
            setFirebaseUser(user)
        } else {
            setFirebaseUser(null)
        }
    })
}, [])

  return firebaseUser !== false ? (
    <Router>
      <Navbar firebaseUser={ firebaseUser }/>
      <div className="container">
        <Switch>
          <Route path="/login">
              <Login />
          </Route>
          <Route path="/admin">
              <Admin />
          </Route>
          <Route path="/reset">
              <ResetPass />
          </Route>
          <Route path="/" exact>
              Ruta de inicio
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Cargando....</p>
  )
}

export default App;

import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import FriendsList from './components/FirendsList'
import { axiosWithAuth } from './utils/axiosWithAuth';


function App() {
  const { isLoggedIn, setLoggedIn } = useState(false);

  const logout = () => {
    axiosWithAuth()
      .post('/logout')
      .then(req => {
        localStorage.removeItem('token')
        setLoggedIn(false);
      })
      .catch(err => { console.log(err) });
  };

  return (
    <Router>
      <div className='App'>
        <ul>
          {(!isLoggedIn) ? (<li> <Link to='/login'>Login</Link></li>) : (<div></div>)}
     
          <li>
            <Link to='#' onClick={logout}>Logout</Link>
          </li>
          {(isLoggedIn) ? (<li><Link to='/protected'>Protected Page</Link></li>) : (<div></div>)}
        </ul>
        <Switch>
          <PrivateRoute exact patch='/protected' component={FriendsList} />
          <Route path='/login' render={(props) => {
            return <Login {...props} setLoggedIn={setLoggedIn} />
          }} />
        </Switch>
      </div>
    </Router>
  );
};

export default App

// function App() {
//   return (
//     <div className="App">
//       <Link to="/login">Login</Link>
//       <Link to='#'>Logout</Link>

// <Switch>

//   <PrivateRoute exact path='/protected' component={FriendsList}/>
//   <Route path="/login" component={Login} />
// </Switch>
//     </div>
//   );
// }





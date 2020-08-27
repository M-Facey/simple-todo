import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

import Login from './components/Login/Login';
import Todo from './components/Todo/Todo';
import Register from './components/Register/Register';

function App() {
  const isAuthenticated = () => {
    try{
      const { userId } = decode(localStorage.getItem('x-token'));
      if(userId) 
        return true;
    } catch(err) {
      return false;
    }
  }
  return (
    <BrowserRouter>
      <Route 
        path="/" exact 
        render={props => !isAuthenticated() ? <Login {...props}/> : <Redirect to="/todo"/>}
      />
      <Route 
        path="/todo" 
        render={props => isAuthenticated()  ? <Todo {...props}/> : <Redirect to="/" />}
      />
      <Route
        path="/register"
        component={Register} 
      />
    </BrowserRouter>
  );
}

export default App;

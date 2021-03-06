import React from 'react'

import { useIsAuthenticated } from '@azure/msal-react';

import './App.css';
import Home from './component/Home';
import LoginForm from './component/LoginForm';


function App() {
  
  const isAuthenticated = useIsAuthenticated();
 
  
  return (
    
    <div className="App ">
      
       { !isAuthenticated ? <LoginForm /> : <Home/>}
    </div>
  );
}

export default App;

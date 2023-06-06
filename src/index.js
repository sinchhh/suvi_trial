import React from 'react';
import ReactDOM from 'react-dom/client';

// import LoginUi from './LoginUi/LoginUi';
import App from './App';
// import { Router } from 'react-router-dom';

// ReactDOM.render( 
//   <Router>
//     <App /> 
//     </Router>,
//   document.getElementById('root')
// );
 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
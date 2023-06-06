import './Login.css';
import email from "./../image/email.png";
import pass from "./../image/lock.png";
import React from "react";
// import bg from "./../image/login_bgnew.png"
function Login() {
  return (
    
    <div className='img'>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>

    <div className='suvi'>
      <p>SUVIDHA</p>
    </div> 
    <div className="main" >
     <div className="intro">
      
        <h1>EVERYTHING EASY AND ECONOMICAL</h1>
        <p>Construction app that provides user with easy access to information about construction and related services at their fingertips.</p>
      
     </div>
     <div className='frame'>
     <div className="sub-main">
       
         <div className='title'>
           <h1>LOGIN</h1>
           <div>
             <img src={email} alt="email" className="email-pic"/>
             <input type="text" placeholder="Email" className="name"/><br></br>
           </div>
           <div className="second-input">
             <img src={pass} alt="pass" className="email-pic"/>
             <input type="password" placeholder="4-digit pin" className="name"/><br></br>
           </div>
          <br></br>
          
          <button>Login</button>
          
       
           <p >
              <a href="#" className='link'>Forgot pin?</a> 
              <br></br>
              <a href="/signup" >Sign Up</a>
            </p>
            <br></br>
           
           
         </div>
       
       
         </div>
      </div> 
    </div>
    </div>
  );
}

export default Login;
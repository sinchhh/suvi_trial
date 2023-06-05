import './LoginUi.css';
import profile from "./../image/a.png";
import email from "./../image/email.png";
import pass from "./../image/lock.png";
// import bg from "./../image/login_bgnew.png"
function LoginUi() {
  return (
    
    <div className='img'>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>

    <div className='suvi'>
      <p>SUVIDHA</p>
    </div> 
    <div className="main" >
     
     <div className="sub-main">
       <div>
         <div className='title'>
           <h1>LOGIN</h1>
           <div>
             <img src={email} alt="email" className="email"/>
             <input type="text" placeholder="email" className="name"/><br></br>
           </div>
           <div className="second-input">
             <img src={pass} alt="pass" className="email"/>
             <input type="password" placeholder="password" className="name"/><br></br>
           </div>

          <div className="login-button">
          <button>Login</button>
          </div>
       
           <p className="link">
              <a href="#">Forgot password?</a> 
              <br></br>
              <a href="#">Sign Up</a>
            </p>
            <br></br>
           
 
         </div>
       </div>
       

      </div> 
    </div>
    </div>
  );
}

export default LoginUi;
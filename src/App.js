import React, { useEffect, useState } from "react";
import  { Auth, Hub } from "aws-amplify";
import './components/Login.css';
import './components/Signup.css';
import email from "./image/email.png";
import pass from "./image/lock.png";
import logo from "./image/logo.png";
import useri from "./image/user.png";

const initialFormState = {
  username: "",
  password: "",
  email: "",
  authCode: "",
  formType: "signIn",
};


function App() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function validatePassword() {
    if (password !== confirmPassword) {
      document.getElementById('confirm_password').setCustomValidity("Passwords Don't Match");
    } else {
      document.getElementById('confirm_password').setCustomValidity('');
    }
  }
  
  const [formState, updateFormState] = useState(initialFormState);

  const [user, updateUser] = useState(null);

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      updateUser(user);

      console.log("got user", user);

      updateFormState(() => ({ ...formState, formType: "signedIn" }));
    } catch (err) {
      console.log("checkUser error", err);
      updateFormState(() => ({ ...formState, formType: "signIn" }));
    }
  };

  // Skip this if you're not using Hub. You can call updateFormState function right
  // after the Auth.signOut() call in the button.
  const setAuthListener = async () => {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signOut":
          console.log(data);
          updateFormState(() => ({
            ...formState,
            formType: "signIn",
          }));
          break;
        case "signIn":
          console.log(data);
           break;
      }
    });
  };

  useEffect(() => {
    checkUser();
    setAuthListener();
  }, []);

  const onChange = (e) => {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  };

  const { formType } = formState;

  const signUp = async () => {
    const { username, email, password } = formState;

    await Auth.signUp({  username, password, attributes: {email } });

    updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
  };

  const confirmSignUp = async () => {
    const { username, authCode } = formState;

    await Auth.confirmSignUp(username, authCode);

    updateFormState(() => ({ ...formState, formType: "signIn" }));
  };

  const signIn = async () => {
    const { username, password } = formState;

    await Auth.signIn(username, password);

    updateFormState(() => ({ ...formState, formType: "signedIn" }));
  };

  const forgotpassword = async () => {
    const { username } = formState;

    await Auth.forgotPassword(username);

    updateFormState(() => ({ ...formState, formType: "confirmForgotPassword" }));
  };

  const confirmForgotPassword = async () => {
    const { username,otp,newpassword } = formState;
    await Auth.forgotPasswordSubmit(username, otp, newpassword);
    updateFormState(() => ({ ...formState, formType: "signIn" }));
}
  return (
    <>
      {formType === "signUp" && (
        <div className='s_img'>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <div className="s_main" >
       <div className="s_intro">
       <div className='s_ses'>Space Energy Systems</div>
          <div><h2>EVERYTHING EASY AND ECONOMICAL</h2>
          <p>Construction application that gets you easy access to building information, create plan, schedule, resources, material and related services at your fingertips.</p>
          </div>
       </div>
       <div className='s_frame'>
       <div className="s_sub-main">
         
           <div >
           <div className='s_title-logo'>
           <img src={logo} alt="logo" className="s_logo-pic"/>
           </div> 
           <div>
            <div>
            <img src={useri} alt="user" className="s_name-pic"/>
               <input type="text" name="name" onChange={onChange} placeholder="Name" className="s_name" required/><br></br>
            </div>
             <div className="s_second-input">
             <img src={email} alt="email" className="s_email-pic"/>
               <input type="email" name="username"onChange={onChange} placeholder="Email" className="s_name" required/><br></br>
             </div>
             <div className="s_second-input">
               <img src={pass} alt="pass" className="s_email-pic"/>
               <input type="password" id ="password" name="password" onChange={onChange} placeholder="Password" className="s_name"  required/><br></br>
             </div>
             <div className="s_second-input">
               <img src={pass} alt="pass" className="s_email-pic"/>
               <input type="password"  id='confirm_password' placeholder="Verify password"  className="s_name" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onKeyUp={validatePassword} required/><br></br>
             </div> 
            <br></br>
            <button onClick={signUp} >Signup</button>       
             <p>
                <a>Already have an account?</a>
                <br></br>
                <a onClick={() =>updateFormState(() => ({
                ...formState,
                formType: "signIn",
                }))
                } >Login</a>
              </p>
              <br></br> </div>      
           </div>
        </div> 
        </div>
      </div>
      </div>
      )}

      {formType === "confirmSignUp" && (
        <div className='img'>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <div className="main" >
       <div className="intro">
          <div className='ses'>Space Energy Systems</div>
          <div><h2>EVERYTHING EASY AND ECONOMICAL</h2>
          <p>Construction application that gets you easy access to building information, create plan, schedule, resources, material and related services at your fingertips.</p>
          </div>
       </div>
      <div className='frame'>
       <div className="sub-main">
           <div >
           <div className='title-logo'>
           <img src={logo} alt="logo" className="logo-pic"/>
           </div>
           <div>            
             <div>
               <img src={pass} alt="pass" className="email-pic"/>
               <input name="authCode" onChange={onChange} placeholder="Enter code" className="name"required/><br></br>
             </div>
            <br></br>
            <button onClick={confirmSignUp} >Verify</button>
         </div> 
             <p >
                <br></br>
                <a onClick={() =>updateFormState(() => ({
               ...formState,
               formType: "signUp",
               }))} >Sign Up</a>
              </p>
              <br></br> 
           </div>
           </div>
        </div> 
      </div>
      </div>
      )}

      {formType === "signIn" && (
         <div className='img'>
         <meta name="viewport" content="width=device-width,initial-scale=1"/>
       <div className="main" >
        <div className="intro">
           <div className='ses'>Space Energy Systems</div>
           <div><h2>EVERYTHING EASY AND ECONOMICAL</h2>
           <p>Construction application that gets you easy access to building information, create plan, schedule, resources, material and related services at your fingertips.</p>
           </div>
        </div>
       <div className='frame'>
        <div className="sub-main">
            <div >
            <div className='title-logo'>
            <img src={logo} alt="logo" className="logo-pic"/>
            </div>
            <div>            
              <div>
                <img src={email} alt="email"  className="email-pic"/>
                <input type="email" onChange={onChange} name="username" placeholder="Email" className="name" required/><br></br>
              </div>
              <div className="second-input">
                <img src={pass} alt="pass" className="email-pic"/>
                <input type="password" onChange={onChange} name="password" placeholder="Password" className="name" required/><br></br>
              </div>
             <br></br>
             <button onClick={signIn} >Login</button>
          </div> 
              <p >
                 <a onClick={() =>updateFormState(() => ({
                ...formState,
                formType: "forgotpassword",
                }))}>Forgot password?</a> 
                 <br></br>
                 <a onClick={() =>updateFormState(() => ({
                ...formState,
                formType: "signUp",
                }))} >Sign Up</a>
               </p>
               <br></br> 
            </div>
            </div>
         </div> 
       </div>
       </div>
      )}

      {formType === "forgotpassword" && (
        <div className='img'>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <div className="main" >
       <div className="intro">
          <div className='ses'>Space Energy Systems</div>
          <div><h2>EVERYTHING EASY AND ECONOMICAL</h2>
          <p>Construction application that gets you easy access to building information, create plan, schedule, resources, material and related services at your fingertips.</p>
          </div>
       </div>
      <div className='frame'>
       <div className="sub-main">
           <div >
           <div className='title-logo'>
           <img src={logo} alt="logo" className="logo-pic"/>
           </div>
           <div>            
             <div>
               <img src={email} alt="email" className="email-pic"/>
               <input name="username" onChange={onChange} placeholder="Email" className="name"required/><br></br>
             </div>
            <br></br>
            <button onClick={forgotpassword} >Verify</button>
           </div>
           <br></br>  <br></br>  
             {/* <p >
                <br></br>
                <a onClick={() =>updateFormState(() => ({
               ...formState,
               formType: "signUp",
               }))} >Sign Up</a>
              </p>
              <br></br>  */}
           </div>
           </div>
        </div> 
      </div>
      </div>
      )}

      {formType === "confirmForgotPassword" && (
        <div className='img'>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <div className="main" >
       <div className="intro">
          <div className='ses'>Space Energy Systems</div>
          <div><h2>EVERYTHING EASY AND ECONOMICAL</h2>
          <p>Construction application that gets you easy access to building information, create plan, schedule, resources, material and related services at your fingertips.</p>
          </div>
       </div>
      <div className='frame'>
       <div className="sub-main">
           <div >
           <div className='title-logo'>
           <img src={logo} alt="logo" className="logo-pic"/>
           </div>
           <div>            
             <div>
              <img src={pass} alt="pass" className="email-pic"/>
              <input name="otp" onChange={onChange} placeholder="Enter code"className="name"required/><br></br>
              <img src={pass} alt="pass" className="email-pic"/>
              <input name="newpassword" type="password" onChange={onChange} placeholder="newpassword" required/><br></br>
             </div>
            <br></br>
            <button onClick={confirmForgotPassword} >Submit</button>
         </div> 
         <br></br>  <br></br> 
           </div>
           </div>
        </div> 
      </div>
      </div>
      )}

      {formType === "signedIn" && (
        <div className='img'>
          <meta name="viewport" content="width=device-width,initial-scale=1"/>
          <div className="main" >
          <div className="intro">
          <div className='ses'><center>Space Energy Systems</center></div>
          <div><h2><center>Welcome the app, {user.attributes.email}!</center></h2></div>
          <center><button onClick={() => { Auth.signOut();}}> Signout </button></center>
          </div>
        </div></div>
      )}

      <hr />
    </>
  );
}

export default App;

import React, { useEffect } from 'react';
import gsap from 'gsap';
import './Login.css';

const Login = () => {
  useEffect(() => {
    // GSAP animation setup
    let tl = gsap.timeline();
    tl.from(".Login", { x: "-50vw", opacity: 0, duration: 0.8 });
    tl.from(".Sign_Up", { x: "50vw", opacity: 0, duration: 0.8 });
    tl.from(".circle1", { opacity: 0, duration: 0.5 });
    tl.from(".circle2", { opacity: 0, duration: 0.5 });
    tl.from(".circle1_child3", { opacity: 0, duration: 0.5 });
    tl.from(".circle2_child3", { opacity: 0, duration: 0.5 });
    gsap.from(".google", { scale: 1.1, duration: 0.5, stagger: 0.2 });
  }, []);

  const toggleForm = (formType) => {
    const mainContainer = document.querySelector('.main-container');
    if (formType === 'signin') {
      mainContainer.classList.add('animated_signin');
      mainContainer.classList.remove('animated_signup');
    } else {
      mainContainer.classList.add('animated_signup');
      mainContainer.classList.remove('animated_signin');
    }
  };

  return (
    <div className="main-container" id="main">
      <span className="circle1">
        <span className="circle1_child1"></span>
        <span className="circle1_child2"></span>
      </span>
      <div className="circle1_child3"></div>

      <div className="form_container Sign_Up">
        <form action="#">
          <h2>Sign Up</h2>
          <div className="form-field">
            <input type="email" id="emailid2" required />
            <i className="fa-solid fa-envelope"></i>
            <label htmlFor="emailid" className="email_label">Email</label>
          </div>
          <div className="form-field">
            <input type="password" className="password" required />
            <i className="fa-solid fa-lock"></i>
            <label htmlFor="password">Password</label>
          </div>
          <div className="form-field">
            <input type="password" className="password" required />
            <i className="fa-solid fa-lock"></i>
            <label htmlFor="password"> Confirm Password</label>
          </div>
          <button type="submit" className="Login_button">Sign Up</button>
          <div className="signup-link">
            <p> Already have an account? <span onClick={() => toggleForm('signin')} className="Signinlink">Sign In</span></p>
          </div>
        </form>
      </div>

      <div className="form_container Login">
        <form action="#">
          <h2>Login</h2>
          <div className="form-field">
            <input type="email" required />
            <i className="fa-solid fa-envelope"></i>
            <label htmlFor="emailid" className="email_label">Email</label>
          </div>
          <div className="form-field">
            <input type="password" id="password" required />
            <i className="fa-solid fa-lock"></i>
            <label htmlFor="password">Password</label>
          </div>
          <div className="show_password">
            <input type="checkbox" id="check" />show password
          </div>
          <div className="form-forget">
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="Login_button">Login</button>
          <div className="signup-link">
            <p> Don't have an account? <span onClick={() => toggleForm('signup')} className="signuplink">Signup</span></p>
          </div>
        </form>
      </div>

      <span className="circle2">
        <span className="circle2_child1"></span>
        <span className="circle2_child2"></span>
      </span>
      <div className="circle2_child3"></div>
    </div>
  );
};

export default Login;

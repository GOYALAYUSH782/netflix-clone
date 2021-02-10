import React, { useRef } from 'react'
import './SignupScreen.css';
import { auth, provider } from '../firebase';

function SignupScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then(authUser => {
        console.log(authUser)
      })
      .catch(err => alert(err.message));
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then(authUser => console.log(authUser))
      .catch(err => alert(err.message));
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then(authUser => {
        console.log(authUser);
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className='signupScreen'>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type='email' placeholder='Email' />
        <input ref={passwordRef} type='password' placeholder='Password' />
        <button type='submit' onClick={signIn}>Sign In</button>
        <button type='submit' onClick={signInWithGoogle}>Sign In with Google</button>
        <h4>
          <span className='signupScreen_grey'> New to Netflix? </span>
          <span className='signupScreen_link' onClick={register}>Sign Up Now.</span>
        </h4>
      </form>
    </div>
  )
}

export default SignupScreen

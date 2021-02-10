import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser, selectPlan, clearPlan } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const plan = useSelector(selectPlan);

  useEffect(() => {
    const unsubscibe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email
          })
        );
      } else {
        dispatch(logout());
        dispatch(clearPlan());
      }
    });

    return unsubscibe;

  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) :
          !plan ? (
            <ProfileScreen />
          ) : (
              <Switch>
                <Route exact path="/profile">
                  <ProfileScreen />
                </Route>
                <Route exact path="/">
                  <HomeScreen />
                </Route>
              </Switch>
            )
        }
      </Router>
    </div>
  );
}

export default App;

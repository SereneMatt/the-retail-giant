import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// Guaranteed that class names are unique. Easy to remove this style if unused.
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

// It is possible to share this component. Able to leverage props.
// De-structure the props
const Text = styled.div`
  color: red;
  font-size: 28px;
  border: ${ ({isActive}) => isActive ? '1px solid black' : '3px dotted green' };
`;

class App extends React.Component {
  // YOU DON'T NEED CONSTRUCTOR
  // "close" subscription to prevent memory leak
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // Without having to manually fetch from server - "open" subscription
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) { 
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }
      
      setCurrentUser(userAuth);
    });
  }

  // "close" subscription to prevent memory leak
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Text isActive={false}>I am a styled component</Text>
        {/* Always place header outside of switch. It always exists. */}
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          {/* Shop will have category later and hence no exact */}
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          {/* Use exact and render. render is a javascript invocation. Use it instead of component */}
          <Route exact path='/signin' render={() => this.props.currentUser ? (
            <Redirect to='/' />
          ) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  // dispatch is a way for redux to know whatever action you are passing it
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

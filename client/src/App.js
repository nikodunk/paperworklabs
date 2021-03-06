import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from './auth/firebase';

import './App.css';


import Workflows from './Workflows'

import { getUsergroup } from './api'

import imageUrl from './icon.png';

export default class App extends React.Component {
  
  // Configure FirebaseUI.
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: 'none',
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };


  constructor(props) {
      super(props);
      
      this.state = { 
            dashboard: false,
            isSignedIn: false,
            user: null,
            usergroup: null
          }

  }

  componentDidMount() {

          
          // displayName: displayName,
          // email: email,
          // emailVerified: emailVerified,
          // phoneNumber: phoneNumber,
          // photoURL: photoURL,
          // uid: uid,
          // accessToken: accessToken,
          // providerData: providerData



      
          // check that userid is logged in and fetch state
          this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
                 this.setState({isSignedIn: !!user});

                 firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
                 // Send token to your backend via HTTPS

                     getUsergroup(user.uid, idToken)
                        .then((usergroup) => {
                            this.setState({usergroup: usergroup})
                        })
                        

                 }).catch(function(error) {
                   console.log(error)
                 });

          });
     
  }


  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  logout(){
    firebase.auth().signOut();
    window.location = '/'
  }


  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <nav class="navbar navbar-light " >
            <img src={imageUrl} width="30" height="30" className="d-inline-block align-top" alt="" />
              <a className="navbar-brand" href="/app.html">
                &nbsp;paperwork labs
              </a>
              <span className="navbar-text" style={{marginRight: "auto"}}>
                Healthcare Workflow Optimization
              </span>
          </nav>
          <div style={{paddingTop: 70}}>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </div>
        </div>
      );
    }
    return (
      <div>

        <div>

            {/* NAVIGATION */}
            <nav className="navbar navbar-light  navbar-expand-md" >
              <img src={imageUrl} width="30" height="30" className="d-inline-block align-top" alt="" />
              <a className="navbar-brand" href="/app.html">
                &nbsp;paperwork labs
              </a>
              <span className="navbar-text" style={{marginRight: "auto"}}>
                { firebase.auth().currentUser.displayName }
              </span>

              <div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                    
                    
                    <a className="nav-item nav-link dodgerblue" onClick={() => this.setState({dashboard: true})}>
                      Epic
                    </a>

                    <a className="nav-item nav-link dodgerblue" onClick={() => this.setState({dashboard: true})}>
                      NextGen
                    </a>

                    <a className="nav-item nav-link dodgerblue" onClick={() => this.setState({dashboard: false})}>
                      eClinicalWorks
                    </a>

                    <a className="nav-item nav-link dodgerblue" onClick={() => this.setState({dashboard: true})}>
                      AllScripts
                    </a>

                    <a className="nav-item nav-link dodgerblue" onClick={() => this.setState({dashboard: true})}>
                      Greenway
                    </a>

                    <a className="nav-item nav-link dodgerblue" onClick={() => this.setState({dashboard: true})}>
                      athenahealth
                    </a>

                    <a className="nav-item nav-link" style={{cursor: 'pointer'}} onClick={() => {this.logout()}}>Logout</a>
                  </div>
                </div> 
              </div>
            </nav>



            {/* APP  */}
            {this.state.usergroup ? 
              <div style={{paddingTop: 55}}> 
                    <Workflows 
                            user={firebase.auth().currentUser}
                            usergroup={this.state.usergroup}
                            /> 
              </div> : null }



        </div>
      </div>
    );
  }


}






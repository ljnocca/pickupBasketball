import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) { }

  signupUser (email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        success => {
          console.log('Successfully signed up!');
          this.router.navigate(['/nextgame']);
        }
      )
      .catch(
        error => console.log('There was an error signing up: ', error)
      );
  }

  signinUser (email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/nextgame']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token;
                console.log('Successfully signed in!');
                console.log('token is', this.token);
              }
            )
        }
      )
      .catch(
        error => console.log('There was an error signing in: ', error)
      );
  }

  logoutUser() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
          console.log('get token called and token is', this.token);
        }
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}

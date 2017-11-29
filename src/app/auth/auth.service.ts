import * as firebase from 'firebase';

export class AuthService {
  signupUser (email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        success => console.log('Successfully signed up!')
      )
      .catch(
        error => console.log('There was an error signing up: ', error)
      );
  }

  signinUser (email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        success => console.log('Successfully signed in!')
      )
      .catch(
        error => console.log('There was an error signing in: ', error)
      );
  }
}

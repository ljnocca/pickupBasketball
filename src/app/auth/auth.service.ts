import * as firebase from 'firebase';

export class AuthService {
  token: string;

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
        response => {
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

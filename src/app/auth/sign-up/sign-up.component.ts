import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    // retrieve values from signup form
    const fname = form.value.fname;
    const lname = form.value.lname;
    const email = form.value.email;
    const password = form.value.password;

    // create user in Firebase
    this.authService.signupUser(email, password);

  }

}

import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Player} from '../../players/player.model';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public status = 'OUT';
  public players: Array<Player> = [];

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

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

    const player = new Player(
      fname, lname, email, this.status
    );

    this.players.push(player);

    this.http.put('https://pickupbasketball-11fc7.firebaseio.com/players.json', this.players)
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );

  }

}

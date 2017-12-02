import {Component, OnChanges, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Player} from '../players/player.model';
import {Http, Response} from '@angular/http';
import {AuthService} from '../auth/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-next-game',
  templateUrl: './next-game.component.html',
  styleUrls: ['./next-game.component.scss']
})
export class NextGameComponent implements OnInit, OnChanges {
  public nextGame;
  public loggedInEmail;
  public status = 'OUT';
  public checked;
  public players: Array<Player> = [];
  public playersIn: Array<Player> = [];
  public playersOut: Array<Player> = [];
  token: string;

  constructor(private http: Http,
              private authService: AuthService) { }

  ngOnInit() {
    this.token = this.authService.getToken();
    console.log(this.checked);
    console.log(this.status);
    this.http.get('https://pickupbasketball-11fc7.firebaseio.com/players.json?auth=' + this.token)
      .subscribe(
        (response: Response) => {
          if (response.json() !== null) {
            // if players already exist, set the player array to what is already stored in Firebase
            this.players = response.json();
          }
          for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].status === 'IN') {
              this.checked = true;
              this.playersIn.push(this.players[i]);
            } else if (this.players[i].status === 'OUT') {
              this.checked = false;
              this.playersOut.push(this.players[i]);
            }
          }
          console.log(this.checked);
          console.log(this.status);
        }
      );
    this.loggedInEmail = firebase.auth().currentUser.email;
    console.log('email', this.loggedInEmail);
  }

  ngOnChanges() {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].status === 'IN') {
        this.playersIn.push(this.players[i]);
      } else if (this.players[i].status === 'OUT') {
        this.playersOut.push(this.players[i]);
      }
    }
  }

  onSlide() {
    if (this.status === 'OUT' ) {
      this.checked = true;
      this.status = 'IN';
    } else if (this.status === 'IN') {
      this.checked = false;
      this.status = 'OUT'
    }

    let loggedInUserIndex;
    for (let i = 0; i < this.players.length; i++) {
      console.log('player ' + i + this.players[i]);
      if (this.loggedInEmail === this.players[i].email) {
        loggedInUserIndex = i;
        this.players[loggedInUserIndex].status = this.status;
      }
    }

    this.http.put('https://pickupbasketball-11fc7.firebaseio.com/players.json?auth=' + this.token, this.players)
      .subscribe(
        (putResponse: Response) => {
          console.log('successfully saved new players array');
        },
        (error) => console.log(error)
      );
  }

}

import {Component, OnChanges, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Player} from '../players/player.model';
import {NgForm} from '@angular/forms';
import {Http, Response} from '@angular/http';
import {AuthService} from '../auth/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-next-game',
  templateUrl: './next-game.component.html',
  styleUrls: ['./next-game.component.scss']
})
export class NextGameComponent implements OnInit {
  public nextGame;
  public loggedInEmail;
  public loggedInPlayer: Player;
  public status = 'OUT';
  public players: Array<Player> = [];
  token: string;

  constructor(private http: Http,
              private authService: AuthService) { }

  ngOnInit() {
    this.token = this.authService.getToken();

    this.http.get('https://pickupbasketball-11fc7.firebaseio.com/players.json?auth=' + this.token)
      .subscribe(
        (response: Response) => {
          if (response.json() !== null) {
            // if players already exist, set the player array to what is already stored in Firebase
            this.players = response.json();
          }
          console.log('players are:', this.players);
        }
      );
    this.loggedInEmail = firebase.auth().currentUser.email;
    console.log('email', this.loggedInEmail);
  }

  onSlide() {
    if (this.status === 'OUT' ) {
      this.status = 'IN';
    } else if (this.status === 'IN') {
      this.status = 'OUT'
    }
  }

  onAdd() {
    let loggedInUserIndex;
    for (let i = 0; i < this.players.length; i++) {
      console.log('player ' + i + this.players[i]);
      if (this.loggedInEmail === this.players[i].email) {
        loggedInUserIndex = i;
        this.players[loggedInUserIndex].status = this.status;
      }
    }
    console.log('index of logged in user is ', loggedInUserIndex);

    this.http.put('https://pickupbasketball-11fc7.firebaseio.com/players.json?auth=' + this.token, this.players)
      .subscribe(
        (putResponse: Response) => {
          console.log('successfully saved new players array');
          console.log(putResponse);
        },
        (error) => console.log(error)
      );
  }


}

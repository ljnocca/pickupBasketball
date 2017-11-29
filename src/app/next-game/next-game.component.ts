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
  public status = 'OUT';
  public players: Array<Player> = [];

  constructor(private http: Http,
              private authService: AuthService) { }

  ngOnInit() {
    const token = this.authService.getToken();
    console.log('token oninit', token);

    this.http.get('https://pickupbasketball-11fc7.firebaseio.com/players.json?auth=' + token)
      .subscribe(
        (response: Response) => {
          if (response.json() !== null) {
            // if players already exist, set the player array to what is already stored in Firebase
            this.players = response.json();
          }
        }
      );
  }

  onSlide() {
    if (this.status === 'OUT' ) {
      this.status = 'IN';
    } else if (this.status === 'IN') {
      this.status = 'OUT'
    }
  }

  onAdd() {
    const player = new Player(
      'firstName', 'lastname', 'email', this.status
    );
    this.players.push(player);

    const token = this.authService.getToken();
    this.http.put('https://pickupbasketball-11fc7.firebaseio.com/players.json?auth=' + token, this.players)
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }


}

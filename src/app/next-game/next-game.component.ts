import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {Player} from '../players/player.model';
import {NgForm} from '@angular/forms';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-next-game',
  templateUrl: './next-game.component.html',
  styleUrls: ['./next-game.component.scss']
})
export class NextGameComponent implements OnInit {
  public nextGame;
  public status = 'OUT';
  public players: Array<Player> = [];

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('https://pickupbasketball-11fc7.firebaseio.com/players.json')
      .subscribe(
        (response: Response) => {
          this.players = response.json();
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
    this.http.put('https://pickupbasketball-11fc7.firebaseio.com/players.json', this.players.slice())
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
    const player = new Player(
      'firstName', 'lastname', 'email', 'password', this.status
    )
    this.players.push(player);
  }


}

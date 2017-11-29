import { Component, OnInit } from '@angular/core';
import {Player} from './player.model'

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];

  constructor() { }

  ngOnInit() {
  }

}

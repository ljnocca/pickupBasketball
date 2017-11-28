import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-next-game',
  templateUrl: './next-game.component.html',
  styleUrls: ['./next-game.component.scss']
})
export class NextGameComponent implements OnInit {
  public nextGame;
  public status = 'OUT';

  constructor() { }

  ngOnInit() {
  }

  onSlide() {
    if (this.status === 'OUT' ) {
      this.status = 'IN';
    } else if (this.status === 'IN') {
      this.status = 'OUT'
    }
  }
}

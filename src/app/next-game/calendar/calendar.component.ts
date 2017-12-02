import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  daysAdded: number;
  gameDay;

  constructor() { }

  ngOnInit() {
    const today = moment().startOf('day').format('d');

    if (today === '7') {
      this.daysAdded = 2;
    } else if (today === '1') {
      this.daysAdded = 1;
    } else if (today === '2') {
      this.daysAdded = 0;
    } else if (today === '3') {
      this.daysAdded = 1;
    } else if (today === '4') {
      this.daysAdded = 0;
    } else if (today === '5') {
      console.log('YESS');
      this.daysAdded = 1;
    } else if (today === '6') {
      this.daysAdded = 0;
    }

    this.gameDay = moment().add(this.daysAdded, 'days').format('dddd, MMMM Do');
  }

}

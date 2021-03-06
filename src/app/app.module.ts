import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import {MatMenuModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material'
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import * as moment from 'moment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from '@angular/router';
import { NextGameComponent } from './next-game/next-game.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CalendarComponent } from './next-game/calendar/calendar.component';
import {FormsModule} from '@angular/forms';
import { PlayersComponent } from './players/players.component';
import {AuthService} from './auth/auth.service';
import {PlayerService} from './players/player.service';
import {HttpModule} from '@angular/http';
import {AuthGuardService} from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: SignInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuardService]},
  { path: 'nextgame', component: NextGameComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NextGameComponent,
    SignInComponent,
    SignUpComponent,
    CalendarComponent,
    PlayersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NoopAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatMenuModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

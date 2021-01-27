import { Component, OnInit } from '@angular/core';
import { MatchModel } from 'src/app/models/match.model';
import { LoginService } from 'src/app/services/login.service';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-current-match',
  templateUrl: './current-match.component.html',
  styleUrls: ['./current-match.component.scss']
})
export class CurrentMatchComponent implements OnInit {

  currentMatch: MatchModel;
  loggedUser: any;
  numberGenerated: number;

  constructor(private matchesService: MatchesService, private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.currentMatch = this.matchesService.getUpcomingMatch();
    this.loggedUser = this.loginService.userLogged;

    let userFoundInCurrentMatch = this.currentMatch.users?.find(user => user.user === this.loggedUser.username);
    if(userFoundInCurrentMatch) {
      this.numberGenerated = userFoundInCurrentMatch.number;
    }
  }

  playMatch() {
      this.numberGenerated = Math.floor(Math.random() * 101);
      this.matchesService.updateMatch(this.currentMatch.id, this.loggedUser.username, this.numberGenerated);
  }
}

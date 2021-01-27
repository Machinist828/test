import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { MatchResultModel } from '../models/match-results.model';
import { MatchModel } from '../models/match.model';
import { MATCHES_LIST } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  matches: MatchModel[];
  matchResults: MatchResultModel[];

  constructor() {
    this.matches = [];
    this.matchResults = [];
  }

  getAllMatches(): Promise<MatchModel[]>{
    //simulate api call so return it in a promise
    return new Promise<MatchModel[]>((resolve,reject) => {
      resolve(this.matches);
    });
  }

  generateMatches() {
    let matches = MATCHES_LIST as MatchModel[];

    this.matches = this.addExpiryDateToMatches(matches); ;
  }

  addExpiryDateToMatches(matches: MatchModel[]) {
    let now = Date.now();
    let expiresIn = 1;
    matches.forEach(match => {
      if(!match.users) {
        match.users = [];
      }
      if(!match.expiryDate) {
        match.expiryDate = moment(now).add(expiresIn, 'minutes').format('YYYY-MM-DDTHH:mm');
        expiresIn++;
      }
      else {
        let expiryDate = new Date(match.expiryDate);
        if(now > expiryDate.getTime()) {
          this.updateResults(match);
        }
      }
    });

    return matches;
  }

  findWinnerUser(match) {
    if(match.users && match.users.length > 0) {
      return match.users.reduce(function (a, b) { return a.number > b.number ? a : b; });
    }
    else {
      return null;
    }
  }

  updateResults(match?: MatchModel) {
    if(match) {
      // generate dummy match result if the predefined list of matches contains a match with expired date
      let matchResult = new MatchResultModel();
      matchResult.matchId = match.id;
      matchResult.matchName = match.name;
      let winnerUser = this.findWinnerUser(match);
      matchResult.user = winnerUser?.user,
      matchResult.winningNumber = winnerUser?.number;
      this.matchResults.push(matchResult);
    }
  }

  getMatchResults(): Promise<MatchResultModel[]>{
    //simulate api call so return it in a promise
    return new Promise<MatchResultModel[]>((resolve,reject) => {
      resolve(this.matchResults);
    });
  }

  getUpcomingMatch(): MatchModel{
    let upcomingMatches = this.matches.filter(m => new Date(m.expiryDate).getTime() > Date.now());

    return upcomingMatches.reduce(function (a, b) { return a.expiryDate < b.expiryDate ? a : b; });
  }

  updateMatch(matchId: number, user: string, numberGenerated: number) {
    let findMatch = this.matches.find(m => m.id === matchId);
    if(findMatch) {
      findMatch.users.push({
        user: user,
        number: numberGenerated
      });
    }
  }

  findExpiredMatchesAndUpdate() {
    this.matches.forEach(m => {
      let matchResultFound = this.matchResults.find(match => match.matchId === m.id);
      if(!matchResultFound && new Date(m.expiryDate).getTime() < Date.now()) {
        this.updateResults(m);
      }
    })

    return this.matchResults;
  }
}

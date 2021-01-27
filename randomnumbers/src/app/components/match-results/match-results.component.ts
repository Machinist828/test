import { Component, OnInit } from '@angular/core';
import { MatchResultModel } from 'src/app/models/match-results.model';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-match-results',
  templateUrl: './match-results.component.html',
  styleUrls: ['./match-results.component.scss']
})
export class MatchResultsComponent implements OnInit {

  results: MatchResultModel[];

  constructor(private matchesService: MatchesService) { }

  ngOnInit(): void {
    this.matchesService.getMatchResults().then(result => {
      this.results = result;
    });
  }
  refreshResults() {
    this.results = this.matchesService.findExpiredMatchesAndUpdate();
  }
}

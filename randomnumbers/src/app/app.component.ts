import { Component } from '@angular/core';
import { MatchesService } from './services/matches.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'randomnumbers';

  constructor(private matchesService: MatchesService) {

    this.matchesService.generateMatches();
  }
}

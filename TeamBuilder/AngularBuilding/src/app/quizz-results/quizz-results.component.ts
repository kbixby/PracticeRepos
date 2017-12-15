import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzService } from '../services/quizz.service';
import { QuizzResult } from '../data.model';

@Component({
  selector: 'app-quizz-results',
  templateUrl: './quizz-results.component.html',
  styleUrls: ['./quizz-results.component.css']
})
export class QuizzResultsComponent implements OnInit {
  results: QuizzResult;

  constructor(
    private quizzService: QuizzService,
    private router: Router) { }

  ngOnInit() {
    this.results = this.quizzService.getResults();
  }

  goToStart() {
    this.router.navigate(['/start']);
  }

}

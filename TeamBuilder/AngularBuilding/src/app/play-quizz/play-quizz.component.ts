import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzService } from '../services/quizz.service';
import { Question, Quizz, QuizzAnswer, QuizzResult, Answer } from '../data.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-play-quizz',
  templateUrl: './play-quizz.component.html',
  styleUrls: ['./play-quizz.component.css']
})
export class PlayQuizzComponent implements OnInit {
  quizz: Quizz;
  quizzId: string;
  results: QuizzResult;
  currentQuestion: Question;

  showDebug = false;
  showResults = true;

  sub: Subscription;

  constructor(
    private quizzService: QuizzService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.quizzId = params['id'];
      this.quizz = this.quizzService.getQuizzById(this.quizzId);
      this.quizzService.newSession(this.quizzId);
      this.currentQuestion = this.quizzService.getNextQuestion();
    });
  }

  handleSelectAnswer(ans: Answer) {
    console.log('Answer got:', ans);

    this.quizzService.addAnswer(this.currentQuestion, ans);

    // end quizz if no more questions. Otherwise, present next question
    this.currentQuestion = this.quizzService.getNextQuestion();
    if (!this.currentQuestion) {
      this.router.navigate(['/result']);
    }
  }

  OnDestroy() {
    this.sub.unsubscribe();
  }
}

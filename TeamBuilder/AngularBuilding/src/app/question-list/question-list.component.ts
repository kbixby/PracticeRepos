import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quizz, Question } from '../data.model';
import { QuizzService } from '../services/quizz.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  quizz: Quizz;
  id: string;
  sub: Subscription;
  showDebug = true;

  constructor(private quizzService: QuizzService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.quizz = this.quizzService.getQuizzById(this.id);
    });
  }

  OnDestroy() {
    this.sub.unsubscribe();
  }

  newQuestion() {
    const newQ = this.quizzService.createQuestion('', []);
    this.quizz.questions.push(newQ);
  }

  remove(i: number) {
    this.quizz.questions.splice(i, 1);
  }

  duplicate(q: Question) {
    const newQ = this.quizzService.createQuestion(q.text, q.answers);
    this.quizz.questions.push(newQ);
  }

  save() {
    this.quizzService.saveQuizz(this.quizz);
    this.router.navigate([`/manage`]);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question, Answer } from '../data.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionsComponent implements OnInit {
  @Input() question: Question;
  @Input() editable: boolean;
  @Output() selectedAnswer = new EventEmitter();
  editMode = false;

  constructor() { }

  ngOnInit() {
  }

  handleSelectAnswer(ans: Answer) {
    this.selectedAnswer.emit(ans);
  }
}

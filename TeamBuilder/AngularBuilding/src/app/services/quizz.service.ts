import {Injectable} from '@angular/core';
import {Answer, Question, Quizz, QuizzResult} from '../data.model';

@Injectable()
export class QuizzService {
  private idCounter;
  private quizzes: {[id: string]: Quizz};
  private results: QuizzResult;

  private currentQuizzId: string;
  private currentQuestionNumber: number;

  constructor() {
    this.quizzes = {};
    this.idCounter = 0;
    this.createQuizz('A Sample Quizz', this.getSampleQuizz1());
    this.createQuizz('A Second Sample Quizz', this.getSampleQuizz2());
    this.createQuizz('A Third Sample Quizz', this.getSampleQuizz3());
  }

  public newSession(quizzId: string) {
    this.currentQuizzId = quizzId;
    this.currentQuestionNumber = 0;
    this.results = {
      quizzId,
      answers: [],
    };
  }

  public getNextQuestion(): Question {
    return this.getQuizzById(this.currentQuizzId).questions[this.currentQuestionNumber++];
  }

  public addAnswer(question: Question, answer: Answer) {
    this.results.answers.push({
      question,
      answer,
      correctAnswer: answer.isCorrect ? answer : question.answers.filter(a => a.isCorrect)[0],
    });
  }

  public getResults(): QuizzResult {
    return this.results;
  }

  public createQuizz(name: string, questions: Question[]) {
    const newQuizz: Quizz = {
      id: name.replace(/\s+/g, '-').toLowerCase(),
      name,
      questions: questions.map(q => this.createQuestion(q.text, q.answers)),
    };
    this.quizzes[newQuizz.id] = newQuizz;
    return newQuizz;
  }

  public saveQuizz(quizz: Quizz) {
    for (const qId of Object.keys(this.quizzes)) {
      if (qId === quizz.id) {
        this.quizzes[qId].name = quizz.name;
        this.quizzes[qId].questions = quizz.questions;
      }
    }
  }

  public getQuizzes(): Quizz[] {
    return Object.keys(this.quizzes).map(id => this.getQuizzById(id));
  }

  public getQuizzById(id: string): Quizz {
    return JSON.parse(JSON.stringify(this.quizzes[id]));
  }

  public createQuestion(text: string, answers: Answer[]): Question {
    this.idCounter++;
    return {
      id: this.idCounter,
      text,
      answers,
    };
  }

  private getSampleQuizz1() {
    return [
      {
        id: 1,
        text: 'What is the meaning of life?',
        answers: [
          {text: 'What is life?', isCorrect: false},
          {text: '42', isCorrect: true},
          {text: 'There is none', isCorrect: false},
          {text: 'Love', isCorrect: false},
        ],
      },
      {
        id: 2,
        text: 'Who are you?',
        answers: [
          {text: 'No one', isCorrect: false},
          {text: 'I am a rockstar', isCorrect: true},
        ],
      }
    ];
  }

  private getSampleQuizz2() {
    return [
      {
        id: 1,
        text: 'How many lightbulbs does it take to change a lightbulb changer?',
        answers: [
          {text: 'What?', isCorrect: true},
          {text: 'Exactly 1', isCorrect: false},
          {text: '1', isCorrect: false},
        ],
      },
      {
        id: 2,
        text: 'Why are you here?',
        answers: [
          {text: 'Because I am driving a Ferrari', isCorrect: false},
          {text: 'Reasons', isCorrect: true},
          {text: 'I am a secret agent, can\'t tell you', isCorrect: true},
        ],
      }
    ];
  }

  private getSampleQuizz3() {
    return [
      {
        id: 1,
        text: 'Guess MY favorito color?',
        answers: [
          {text: 'Green', isCorrect: false},
          {text: 'Grün', isCorrect: true},
          {text: 'Verde', isCorrect: false},
        ],
      },
      {
        id: 2,
        text: 'What is the best Star Wars movie?',
        answers: [
          {text: 'From a certain point of view...', isCorrect: false},
          {text: 'I am your father', isCorrect: false},
          {text: 'Noooooo...', isCorrect: true},
        ],
      }
    ];
  }
}


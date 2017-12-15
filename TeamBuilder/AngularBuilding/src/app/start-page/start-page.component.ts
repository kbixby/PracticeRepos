import {Component, OnInit, Inject} from '@angular/core';
import {MdDialog} from '@angular/material';
import {Router} from '@angular/router';
import {QuizzService} from '../services/quizz.service';
import {ChuckService} from '../services/chuck.service';
import {Quizz} from '../data.model';
import {NewQuizzDialogComponent} from './new-quizz-dialog/new-quizz.dialog.component';

interface ChuckNorrisWisdom {
  icon_url: string;
  id: string;
  url: string;
  value: string;
}

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
})
export class StartPageComponent implements OnInit {
  public quizzes: Quizz[];
  public chuckNorrisWisdom: ChuckNorrisWisdom;

  constructor(private quizzService: QuizzService, private chuckService: ChuckService, private router: Router, public dialog: MdDialog) {}

  ngOnInit() {
    this.quizzes = this.quizzService.getQuizzes();
  }

  manageQuizz(quizzId: string) {
    this.router.navigate([`/manage/${quizzId}`]);
  }

  playQuizz(quizzId: string) {
    this.router.navigate([`/play/${quizzId}`]);
  }

  newQuizz() {
    const dialogRef = this.dialog.open(NewQuizzDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const quizz = this.quizzService.createQuizz(result, []);
      this.manageQuizz(quizz.id);
    });
  }

  chuckNorris() {
    this.chuckService.getChuckNorrisWisdom().subscribe(wisdom => {
      this.chuckNorrisWisdom = wisdom.json();
    });
  }
}

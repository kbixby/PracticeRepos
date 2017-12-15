import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzResultsComponent } from './quizz-results.component';

describe('QuizzResultsComponent', () => {
  let component: QuizzResultsComponent;
  let fixture: ComponentFixture<QuizzResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

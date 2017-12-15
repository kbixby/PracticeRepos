import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuizzComponent } from './play-quizz.component';

describe('PlayQuizzComponent', () => {
  let component: PlayQuizzComponent;
  let fixture: ComponentFixture<PlayQuizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayQuizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

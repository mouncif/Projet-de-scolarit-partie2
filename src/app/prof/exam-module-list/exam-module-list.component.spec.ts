import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamModuleListComponent } from './exam-module-list.component';

describe('ExamModuleListComponent', () => {
  let component: ExamModuleListComponent;
  let fixture: ComponentFixture<ExamModuleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamModuleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamModuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

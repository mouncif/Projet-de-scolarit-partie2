import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamModuleDetailComponent } from './exam-module-detail.component';

describe('ExamModuleDetailComponent', () => {
  let component: ExamModuleDetailComponent;
  let fixture: ComponentFixture<ExamModuleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamModuleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamModuleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOperateurComponent } from './login-operateur.component';

describe('LoginOperateurComponent', () => {
  let component: LoginOperateurComponent;
  let fixture: ComponentFixture<LoginOperateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginOperateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOperateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAvisComponent } from './liste-avis.component';

describe('ListeAvisComponent', () => {
  let component: ListeAvisComponent;
  let fixture: ComponentFixture<ListeAvisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeAvisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

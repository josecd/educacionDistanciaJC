import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresHomeComponent } from './profesores-home.component';

describe('ProfesoresHomeComponent', () => {
  let component: ProfesoresHomeComponent;
  let fixture: ComponentFixture<ProfesoresHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesoresHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesoresHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

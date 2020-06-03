import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresEditComponent } from './profesores-edit.component';

describe('ProfesoresEditComponent', () => {
  let component: ProfesoresEditComponent;
  let fixture: ComponentFixture<ProfesoresEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesoresEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesoresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

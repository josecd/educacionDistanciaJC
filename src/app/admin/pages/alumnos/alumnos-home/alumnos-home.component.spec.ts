import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosHomeComponent } from './alumnos-home.component';

describe('AlumnosHomeComponent', () => {
  let component: AlumnosHomeComponent;
  let fixture: ComponentFixture<AlumnosHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosCreateComponent } from './alumnos-create.component';

describe('AlumnosCreateComponent', () => {
  let component: AlumnosCreateComponent;
  let fixture: ComponentFixture<AlumnosCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

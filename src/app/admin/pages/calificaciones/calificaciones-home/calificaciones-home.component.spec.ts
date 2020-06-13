import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesHomeComponent } from './calificaciones-home.component';

describe('CalificacionesHomeComponent', () => {
  let component: CalificacionesHomeComponent;
  let fixture: ComponentFixture<CalificacionesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

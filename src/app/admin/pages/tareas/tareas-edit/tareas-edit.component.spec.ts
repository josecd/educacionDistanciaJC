import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasEditComponent } from './tareas-edit.component';

describe('TareasEditComponent', () => {
  let component: TareasEditComponent;
  let fixture: ComponentFixture<TareasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

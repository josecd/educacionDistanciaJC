import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasHomeComponent } from './materias-home.component';

describe('MateriasHomeComponent', () => {
  let component: MateriasHomeComponent;
  let fixture: ComponentFixture<MateriasHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

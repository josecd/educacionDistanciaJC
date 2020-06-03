import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasCreateComponent } from './materias-create.component';

describe('MateriasCreateComponent', () => {
  let component: MateriasCreateComponent;
  let fixture: ComponentFixture<MateriasCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInicioUserComponent } from './home-inicio-user.component';

describe('HomeInicioUserComponent', () => {
  let component: HomeInicioUserComponent;
  let fixture: ComponentFixture<HomeInicioUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeInicioUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeInicioUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

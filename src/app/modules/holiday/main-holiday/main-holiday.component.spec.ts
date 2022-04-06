import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHolidayComponent } from './main-holiday.component';

describe('MainHolidayComponent', () => {
  let component: MainHolidayComponent;
  let fixture: ComponentFixture<MainHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainHolidayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

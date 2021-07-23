import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooddiaryComponent } from './fooddiary.component';

describe('FooddiaryComponent', () => {
  let component: FooddiaryComponent;
  let fixture: ComponentFixture<FooddiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooddiaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooddiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

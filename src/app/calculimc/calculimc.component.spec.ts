import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculimcComponent } from './calculimc.component';

describe('CalculimcComponent', () => {
  let component: CalculimcComponent;
  let fixture: ComponentFixture<CalculimcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculimcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculimcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

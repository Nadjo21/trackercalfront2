import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataupdateComponent } from './dataupdate.component';

describe('DataupdateComponent', () => {
  let component: DataupdateComponent;
  let fixture: ComponentFixture<DataupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

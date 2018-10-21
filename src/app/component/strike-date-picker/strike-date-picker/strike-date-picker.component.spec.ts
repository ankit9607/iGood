import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrikeDatePickerComponent } from './strike-date-picker.component';

describe('StrikeDatePickerComponent', () => {
  let component: StrikeDatePickerComponent;
  let fixture: ComponentFixture<StrikeDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrikeDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrikeDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

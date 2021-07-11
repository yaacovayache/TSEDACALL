import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicPerMonthComponent } from './graphic-per-month.component';

describe('GraphicPerMonthComponent', () => {
  let component: GraphicPerMonthComponent;
  let fixture: ComponentFixture<GraphicPerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicPerMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatorsTableComponent } from './donators-table.component';

describe('DonatorsTableComponent', () => {
  let component: DonatorsTableComponent;
  let fixture: ComponentFixture<DonatorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonatorsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

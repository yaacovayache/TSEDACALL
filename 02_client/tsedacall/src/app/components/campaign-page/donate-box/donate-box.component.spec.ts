import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateBoxComponent } from './donate-box.component';

describe('DonateBoxComponent', () => {
  let component: DonateBoxComponent;
  let fixture: ComponentFixture<DonateBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

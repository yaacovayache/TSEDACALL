import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateBannerComponent } from './donate-banner.component';

describe('DonateBannerComponent', () => {
  let component: DonateBannerComponent;
  let fixture: ComponentFixture<DonateBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

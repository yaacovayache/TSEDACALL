import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateShareBannerComponent } from './donate-share-banner.component';

describe('DonateShareBannerComponent', () => {
  let component: DonateShareBannerComponent;
  let fixture: ComponentFixture<DonateShareBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateShareBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateShareBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

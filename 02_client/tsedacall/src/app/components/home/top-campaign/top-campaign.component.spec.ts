import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCampaignComponent } from './top-campaign.component';

describe('TopCampaignComponent', () => {
  let component: TopCampaignComponent;
  let fixture: ComponentFixture<TopCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopCampaignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

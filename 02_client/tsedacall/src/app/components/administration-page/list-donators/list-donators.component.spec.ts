import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDonatorsComponent } from './list-donators.component';

describe('ListDonatorsComponent', () => {
  let component: ListDonatorsComponent;
  let fixture: ComponentFixture<ListDonatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDonatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDonatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

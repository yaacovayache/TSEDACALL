import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrSearchComponent } from './create-or-search.component';

describe('CreateOrSearchComponent', () => {
  let component: CreateOrSearchComponent;
  let fixture: ComponentFixture<CreateOrSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

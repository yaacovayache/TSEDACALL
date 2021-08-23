import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCerfaComponent } from './search-cerfa.component';

describe('SearchCerfaComponent', () => {
  let component: SearchCerfaComponent;
  let fixture: ComponentFixture<SearchCerfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCerfaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCerfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

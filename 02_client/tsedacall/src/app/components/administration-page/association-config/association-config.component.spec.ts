import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationConfigComponent } from './association-config.component';

describe('AssociationConfigComponent', () => {
  let component: AssociationConfigComponent;
  let fixture: ComponentFixture<AssociationConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

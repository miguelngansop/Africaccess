import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternanceDetailsComponent } from './alternance-details.component';

describe('AlternanceDetailsComponent', () => {
  let component: AlternanceDetailsComponent;
  let fixture: ComponentFixture<AlternanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlternanceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

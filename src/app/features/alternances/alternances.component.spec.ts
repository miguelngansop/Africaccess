import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternancesComponent } from './alternances.component';

describe('AlternancesComponent', () => {
  let component: AlternancesComponent;
  let fixture: ComponentFixture<AlternancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlternancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

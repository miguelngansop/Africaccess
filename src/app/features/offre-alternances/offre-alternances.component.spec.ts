import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreAlternancesComponent } from './offre-alternances.component';

describe('OffreAlternancesComponent', () => {
  let component: OffreAlternancesComponent;
  let fixture: ComponentFixture<OffreAlternancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreAlternancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreAlternancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

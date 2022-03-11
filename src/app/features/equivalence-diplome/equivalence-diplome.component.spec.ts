import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquivalenceDiplomeComponent } from './equivalence-diplome.component';

describe('EquivalenceDiplomeComponent', () => {
  let component: EquivalenceDiplomeComponent;
  let fixture: ComponentFixture<EquivalenceDiplomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquivalenceDiplomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquivalenceDiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpEntrepriseComponent } from './sign-up-entreprise.component';

describe('SignUpEntrepriseComponent', () => {
  let component: SignUpEntrepriseComponent;
  let fixture: ComponentFixture<SignUpEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

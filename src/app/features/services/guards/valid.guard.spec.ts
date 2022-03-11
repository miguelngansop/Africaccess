import { TestBed } from '@angular/core/testing';

import { ValidGuard } from './valid.guard';

describe('ValidGuard', () => {
  let guard: ValidGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

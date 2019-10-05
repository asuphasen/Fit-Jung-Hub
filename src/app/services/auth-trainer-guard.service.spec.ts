import { TestBed } from '@angular/core/testing';

import { AuthTrainerGuardService } from './auth-trainer-guard.service';

describe('AuthTrainerGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthTrainerGuardService = TestBed.get(AuthTrainerGuardService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AuthMemberGuardService } from './auth-member-guard.service';

describe('AuthMemberGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthMemberGuardService = TestBed.get(AuthMemberGuardService);
    expect(service).toBeTruthy();
  });
});

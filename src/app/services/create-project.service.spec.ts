import { TestBed } from '@angular/core/testing';

import { CreateProjectService } from './create-project.service';

describe('CreateProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateProjectService = TestBed.get(CreateProjectService);
    expect(service).toBeTruthy();
  });
});

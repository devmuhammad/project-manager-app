import { TestBed } from '@angular/core/testing';

import { DefaultlayoutService } from './defaultlayout.service';

describe('DefaultlayoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefaultlayoutService = TestBed.get(DefaultlayoutService);
    expect(service).toBeTruthy();
  });
});

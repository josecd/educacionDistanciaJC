import { TestBed } from '@angular/core/testing';

import { ToasterserviceService } from './toasterservice.service';

describe('ToasterserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToasterserviceService = TestBed.get(ToasterserviceService);
    expect(service).toBeTruthy();
  });
});

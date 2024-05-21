import { TestBed } from '@angular/core/testing';

import { VivenciasService } from './vivencias.service';

describe('VivenciasService', () => {
  let service: VivenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VivenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

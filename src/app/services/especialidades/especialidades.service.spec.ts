import { TestBed } from '@angular/core/testing';

import { especialidadesService } from './especialidades.service';

describe('especialidadesService', () => {
  let service: especialidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(especialidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

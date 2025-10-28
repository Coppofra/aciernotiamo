import { TestBed } from '@angular/core/testing';

import { NomeServizio } from './nome-servizio';

describe('NomeServizio', () => {
  let service: NomeServizio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomeServizio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

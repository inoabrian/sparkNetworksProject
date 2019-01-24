import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DefaultsService } from './defaults.service';

describe('DefaultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [DefaultsService]
    });
  });

  it('should be created', inject([DefaultsService], (service: DefaultsService) => {
    expect(service).toBeTruthy();
  }));
});

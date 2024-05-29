import { TestBed } from '@angular/core/testing';
import { EmployesService } from './employes.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('EmployesService', () => {
  let service: EmployesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [], // Agrega HttpClientTestingModule aquí
      providers: [provideHttpClientTesting,EmployesService]
    });
    service = TestBed.inject(EmployesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

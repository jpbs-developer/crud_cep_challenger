import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ViacepService } from './viacep.service';
import { ZipCode } from './zipode';
import { environment } from '../environments/environment.development';

export const address: ZipCode = {
  id: 432432,
  neighborhood: 'bairro',
  zipCode: '83647738',
  complement: '',
  city: 'Rua X',
  street: 'logradouro',
  state: 'São paulo',
  number: '232'
};

describe('ViacepService', () => {
  let service: ViacepService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ViacepService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return zipcode Infos', () => {
    service.getZipCodeInfos('83647738').subscribe({
      next: (data) => {
        expect(data).toEqual(address);
        expect(data?.zipCode).toEqual('83647738');
      },
    });

    const request = httpTestingController.expectOne(
      `${environment.api}/83647738/json`
    );
    expect(request.request.method).toEqual('GET');
    request.flush(address);
  });

  it(' should return an error when the zip code was not equal to 8 characters', () => {
    expect(() => service.getZipCodeInfos('999999999')).toThrow();
  });
});

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable, catchError, of, throwError } from 'rxjs';
import { ZipCode } from './zipode';
export type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  uf: string;
  localidade: string;
};
@Injectable({
  providedIn: 'root',
})
export class ViacepService {
  private readonly http = inject(HttpClient);

  getZipCodeInfos(zipCode: string): Observable<ViaCepResponse> {
    const ZIPCODE_LENGTH = 8;
    if (zipCode.length !== ZIPCODE_LENGTH)
      throw new Error('Zip code must have 8 characters');
    return this.http.get<ViaCepResponse>(
      `${environment.viaCep}/${zipCode}/json`
    );
  }

  saveInfos(infos: ZipCode) {
    return this.http.post(`${environment.api}/address`, infos);
  }

  updateAddress(infos: ZipCode, infoId: number) {
    return this.http.put(`${environment.api}/address/${infoId}`, infos);
  }

  getAllAddress(): Observable<ZipCode[]> {
    return this.http.get<ZipCode[]>(`${environment.api}/address`);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/address/${id}`);
  }
}

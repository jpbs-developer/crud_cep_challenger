import { Injectable } from '@angular/core';
import { ZipCode } from './zipode';
const KEY = 'INFOS';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public saveInfo(info: ZipCode) {
    this.checkInfosInStorage();
    if (!this.getInfo(info.zipCode)) {
      const infos = this.getInfos();
      localStorage.setItem(KEY, JSON.stringify(infos));
      return infos;
    }

    throw new Error('Já existe esse endereço cadastrado');
  }

  public getInfo(zipCode: string): ZipCode | undefined {
    const infos = this.getInfos();
    if (!infos) return undefined;
    const matchInfo = infos.find((info) => info.zipCode === zipCode);
    return matchInfo;
  }

  getInfos(): ZipCode[] {
    return JSON.parse(localStorage.getItem(KEY) ?? '') ?? [];
  }

  checkInfosInStorage() {
    const infos = localStorage.getItem(KEY);
    if (!infos) localStorage.setItem(KEY, JSON.stringify([]));
  }
}

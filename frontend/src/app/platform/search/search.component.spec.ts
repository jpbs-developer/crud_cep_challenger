import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ViaCepResponse, ViacepService } from '../../viacep.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideNgxMask } from 'ngx-mask';

export const mockViaCepResponse: ViaCepResponse = {
  cep: '83647738',
  logradouro: 'string',
  complemento: 'string',
  bairro: 'string',
  uf: 'string',
  localidade: 'string',
};

describe('SearchComponent', () => {
  let component: SearchComponent;
  let service: jasmine.SpyObj<ViacepService>;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    const viaCepServiceSpy = jasmine.createSpyObj('ViacepService', [
      'getZipCodeInfos',
    ]);
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        { provide: ViacepService, useValue: viaCepServiceSpy },
        provideNgxMask(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    service = viaCepServiceSpy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getZipCodeInfos from the service when the button is pressed', () => {
    service.getZipCodeInfos.and.returnValue(of(mockViaCepResponse));
    fixture.detectChanges();
    const inputZipCode = fixture.debugElement.query(By.css('#zipCodeControl'))
      .nativeElement as HTMLInputElement;
    const searchButton = fixture.debugElement.query(By.css('.search-button'))
      .nativeElement as HTMLButtonElement;

    inputZipCode.value = '57041070';
    inputZipCode.dispatchEvent(new Event('input'));
    component.zipCodeControl.patchValue(inputZipCode.value);
    fixture.detectChanges();
    searchButton.click();

    expect(service.getZipCodeInfos).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
    expect(component.zipCodeControl.value).toBe('');
  });
});

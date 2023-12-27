import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import PlatformComponent from './platform.component';
import { By } from '@angular/platform-browser';
import { ViacepService } from '../viacep.service';
import { of } from 'rxjs';
import { address } from '../viacep.service.spec';

describe('PlatformComponent', () => {
  let component: PlatformComponent;
  let service: jasmine.SpyObj<ViacepService>;
  let fixture: ComponentFixture<PlatformComponent>;

  beforeEach(async () => {
    const viaCepServiceSpy = jasmine.createSpyObj('ViacepService', [
      'getZipCodeInfos',
    ]);
    await TestBed.configureTestingModule({
      imports: [PlatformComponent, HttpClientTestingModule],
      providers: [{ provide: ViacepService, useValue: viaCepServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformComponent);
    service = viaCepServiceSpy;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getZipCodeInfos from the service when the button is pressed', () => {
    service.getZipCodeInfos.and.returnValue(of(address));
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

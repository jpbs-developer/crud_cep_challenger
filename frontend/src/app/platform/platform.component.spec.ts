import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import PlatformComponent from './platform.component';
import { ViacepService } from '../viacep.service';
import { provideToastr } from 'ngx-toastr';
import { provideNgxMask } from 'ngx-mask';
import { address } from '../viacep.service.spec';
import { of } from 'rxjs';

describe('PlatformComponent', () => {
  let component: PlatformComponent;
  let service: jasmine.SpyObj<ViacepService>;
  let fixture: ComponentFixture<PlatformComponent>;

  beforeEach(async () => {
    const viaCepServiceSpy = jasmine.createSpyObj('ViacepService', [
      'getZipCodeInfos',
      'getAllAddress',
    ]);
    await TestBed.configureTestingModule({
      imports: [PlatformComponent, HttpClientTestingModule],
      providers: [
        { provide: ViacepService, useValue: viaCepServiceSpy },
        provideToastr(),
        provideNgxMask(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformComponent);
    service = viaCepServiceSpy;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve all address', () => {
    service.getAllAddress.and.returnValue(of([address]));
    fixture.detectChanges()
    expect(service.getAllAddress).toHaveBeenCalled()
  });
});

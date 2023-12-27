import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfosComponent } from './card-infos.component';
import { provideNgxMask } from 'ngx-mask';

describe('CardInfosComponent', () => {
  let component: CardInfosComponent;
  let fixture: ComponentFixture<CardInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInfosComponent],
      providers: [provideNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(CardInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

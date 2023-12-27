import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ViacepService } from '../../viacep.service';
import { ZipCode } from '../../zipode';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgxMaskDirective, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private readonly service = inject(ViacepService);
  @Output() onSearch = new EventEmitter<ZipCode | null>();
  public zipCode = signal<ZipCode | null>(null);
  @ViewChild('inputSearch', { static: true })
  inputSearch: ElementRef<HTMLInputElement>;
  public loading: boolean = false;
  public readonly zipCodeControl = new FormControl('', [
    Validators.minLength(8),
    Validators.required,
  ]);

  public getZipCodeInfos(): void {
    this.loading = true;
    const zipCode = this.zipCodeControl.value as string;
    this.service.getZipCodeInfos(zipCode).subscribe({
      next: (res) => {
        this.loading = false;
        this.zipCode.set({
          id: Math.round(Math.random() * 1000),
          city: res.localidade,
          complement: res.complemento,
          neighborhood: res.bairro,
          state: res.uf,
          number: '',
          street: res.logradouro,
          zipCode: res.cep,
        });
        this.zipCodeControl.patchValue('');
        this.inputSearch.nativeElement.focus();
        this.onSearch.emit(this.zipCode());
      },
    });
  }
}

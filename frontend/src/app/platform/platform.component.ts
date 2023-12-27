import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ZipCode } from '../zipode';
import { ViacepService } from '../viacep.service';
import { JsonPipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SearchComponent } from './search/search.component';
import { CardInfosComponent } from './card-infos/card-infos.component';
import { TableInfosComponent } from './table-infos/table-infos.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;
@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SearchComponent,
    CardInfosComponent,
    TableInfosComponent,
    NgxSpinnerModule,
  ],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlatformComponent implements OnInit {
  private readonly service = inject(ViacepService);
  private readonly fb = inject(FormBuilder);
  private readonly spinner = inject(NgxSpinnerService);
  private readonly toastr = inject(ToastrService);
  public zipCode = signal<ZipCode | null>(null);
  public zipCodeIdSelected = signal<number>(0);
  public zipCodes = signal<ZipCode[]>([]);
  formModal: any;
  infoForm: FormGroup;
  public ngOnInit(): void {
    this.formModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    this.buildInfoControl();
    this.getAllAddress();
  }

  buildInfoControl() {
    this.infoForm = this.fb.group({
      zipCode: ['', [Validators.minLength(8), Validators.required]],
      street: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      number: [''],
    });
  }

  public getAllAddress() {
    this.spinner.show();
    this.service.getAllAddress().subscribe({
      next: (res) => {
        this.zipCodes.set(res);
        this.spinner.hide();
      },
      error: (err) => this.buildErrorResponse(err),
    });
  }

  public saveInfos() {
    this.spinner.show();
    this.service.saveInfos(this.zipCode() as ZipCode).subscribe({
      next: (res) => {
        this.toastr.success('Endereço salvo com sucesso!');
        this.getAllAddress();
        this.spinner.hide();
      },
      error: (err) => this.buildErrorResponse(err),
    });
  }

  public deleteAddress(id: number) {
    this.spinner.show();
    this.service.deleteAddress(id).subscribe({
      next: (res) => {
        this.toastr.success('Endereço deletado com sucesso!');
        this.spinner.hide();
        this.getAllAddress();
      },
      error: (err) => this.buildErrorResponse(err),
    });
  }

  updateAddress() {
    const address = this.infoForm.value;
    this.spinner.show();
    this.service.updateAddress(address, this.zipCodeIdSelected()).subscribe({
      next: (res) => {
        this.toastr.success('Endereço atualizado com sucesso!');
        this.formModal.hide();
        this.getAllAddress();
        this.spinner.hide();
      },
      error: (err) => this.buildErrorResponse(err),
    });
  }

  public openModalUpdate(info: ZipCode) {
    this.zipCodeIdSelected.set(info.id);
    this.infoForm.patchValue(info);
  }

  buildErrorResponse(err: any) {
    this.spinner.hide();
    this.toastr.error(`${err.error.message}`);
  }
}

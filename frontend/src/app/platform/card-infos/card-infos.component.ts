import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ZipCode } from '../../zipode';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-card-infos',
  standalone: true,
  imports: [NgxMaskPipe],
  templateUrl: './card-infos.component.html',
  styleUrl: './card-infos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInfosComponent {
  @Input() public infos: ZipCode | null;
  @Output() public onSave = new EventEmitter();
}

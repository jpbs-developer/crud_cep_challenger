import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ZipCode } from '../../zipode';

@Component({
  selector: 'app-table-infos',
  standalone: true,
  imports: [],
  templateUrl: './table-infos.component.html',
  styleUrl: './table-infos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableInfosComponent {
  @Input() public infos: ZipCode[] = [];
  @Output() public onUpdate = new EventEmitter<ZipCode>();
  @Output() public onDelete = new EventEmitter<number>();
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GifData, Mp4Data } from 'src/app/models/gif_data.model';
import { GifDetailComponent } from '../dialog/gif-detail/gif-detail.component';

@Component({
  selector: 'app-gif-item',
  templateUrl: './gif-item.component.html',
  styleUrls: ['./gif-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GifItemComponent {
@Input() gif!: GifData;

constructor(
  private dialog: MatDialog
) { }

/**
 * Opens a dialog with the gif detail
 * @param gif GifData
 */
onDetail(gif: GifData) {
  const dialogData = {
    data: {
      gif
    },
  }
  this.dialog.open(GifDetailComponent, dialogData);
}

}

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

onDetail(gif: GifData) {
  const dialogData = {
    data: {
      gif
    },
  }
  this.dialog.open(GifDetailComponent, dialogData);
}

getGifClass(gifInfo: ImageData | Mp4Data) {
  const gifClass = [];
  if( gifInfo.width as number > 250 ) {
    gifClass.push('cols-start-2');
  } else {
    gifClass.push('cols-start-1');
  }

  if(gifInfo.height as  number > 250 ) {
    gifClass.push('rows-start-2');
  } else {
    gifClass.push('rows-start-1');
  }

  return gifClass;
}
}

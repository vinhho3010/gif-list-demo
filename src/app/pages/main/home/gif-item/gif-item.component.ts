import { Component, Input } from '@angular/core';
import { GifData } from 'src/app/models/gif_data.model';

@Component({
  selector: 'app-gif-item',
  templateUrl: './gif-item.component.html',
  styleUrls: ['./gif-item.component.scss']
})
export class GifItemComponent {
@Input() gif!: GifData;
}

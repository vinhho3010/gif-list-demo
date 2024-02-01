import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GifData } from 'src/app/models/gif_data.model';

@Component({
  selector: 'app-gif-detail',
  templateUrl: './gif-detail.component.html',
  styleUrls: ['./gif-detail.component.scss']
})
export class GifDetailComponent implements OnInit{
  gif: GifData | undefined;

  constructor(
    public dialogRef: MatDialogRef<GifDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.gif = this.data.gif;
  }
}

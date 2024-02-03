import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GifData } from 'src/app/models/gif_data.model';
import { Pagination } from 'src/app/models/pagination.model';
import { GifService } from 'src/app/services/gif.service';

@Component({
  selector: 'app-gif-detail',
  templateUrl: './gif-detail.component.html',
  styleUrls: ['./gif-detail.component.scss']
})
export class GifDetailComponent implements OnInit{
  gif: GifData | undefined;
  relatedGifs: GifData[] = [];
  pagination: Pagination = {
    count: 6,
    offset: 0,
    total_count: 0
  }

  constructor(
    public dialogRef: MatDialogRef<GifDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gifService: GifService
  ) { }

  ngOnInit() {
    this.gif = this.data.gif;
    this.loadRelatedGifs();
  }

  loadRelatedGifs() {
    if(this.gif) {
      this.gifService.getRelatedGifs(this.gif.id, this.pagination).subscribe(response => {
        this.relatedGifs = response.data;
        this.pagination.total_count = response.pagination.total_count;
        this.relatedGifs = this.relatedGifs.filter(gif => gif.id !== this.gif?.id);
      });
    }
  }

  identify(index: number, item: GifData) {
    return item.id;
  }
}

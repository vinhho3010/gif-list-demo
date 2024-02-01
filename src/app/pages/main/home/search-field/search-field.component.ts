import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, scan, tap } from 'rxjs';
import { GifService } from 'src/app/services/gif.service';
import { GifData } from 'src/app/models/gif_data.model';
import { ResponseSearch } from 'src/app/models/response_search.model';
import { Pagination } from 'src/app/models/pagination.model';
import { FormControl } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {
  $gifResponse: Observable<any> = new Observable();
  gifs: GifData[] = [];
  searchKey: FormControl = new FormControl('');
  pagination: Pagination = {
    total_count: 0,
    count: 30,
    offset: 0,
  }

  constructor(
    private gifService: GifService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadGifs();
    this.onListenSearchKey();
  }

  loadGifs() {
    this.gifService.getTrendingGifs(this.pagination).pipe(
    ).subscribe({
      next: (response: ResponseSearch<GifData>) => {
        this.gifs = this.gifs.concat(response.data);
        this.pagination.total_count = response.pagination.total_count;
      },
      error: (error) => {
        this.toastService.showErrorToast('Error loading gifs');
      }
    });
  }

  showMore() {
    this.pagination.offset += this.pagination.count;
    if(this.searchKey.value) {
      this.gifService.searchGifs(this.searchKey.value, this.pagination).subscribe({
        next: (response: ResponseSearch<GifData>) => {
          this.gifs = this.gifs.concat(response.data);
          this.pagination.total_count = response.pagination.total_count;
        },
        error: (error) => {
          this.toastService.showErrorToast('Error loading more gifs');
        }
      });
    } else {
      this.loadGifs();
    }
  }

  onListenSearchKey() {
    this.searchKey.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe({
      next: (value: string) => {
        this.pagination.offset = 0;
        this.gifs = [];
        this.searchGifs(value, this.pagination);
      },
      error: (error) => {
        this.toastService.showErrorToast('Error searching gifs');
      }
    })
  }

  searchGifs(value: string, pagination: Pagination): void {
    if(value) {
      this.gifService.searchGifs(value, pagination).subscribe({
        next: (response: ResponseSearch<GifData>) => {
          this.gifs = response.data;
          this.pagination.total_count = response.pagination.total_count;
        },
        error: (error) => {
          this.toastService.showErrorToast('Error searching gifs');
        }
      });
    } else {
      this.loadGifs();
    }
  }

}

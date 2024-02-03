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

/**
 * Loads trending gifs using the GifService and updates the component's gifs and pagination data.
 */
loadGifs(): void {
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

/**
 * Handles the "Show More" action, either loading more trending gifs or executing a search
 * based on the current search key value. Updates the component's gifs and pagination data.
 *
 * @returns void
 */
showMore(): void {
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

/**
 * Listens to changes in the search key input, triggers a search, and updates the component's gifs and pagination data.
 *
 * @returns void
 */
onListenSearchKey(): void {
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

/**
 * Performs a gif search using the GifService based on the provided value and pagination,
 * updating the component's gifs and pagination data accordingly.
 *
 * @param value - The search key for the gifs.
 * @param pagination - The pagination information for the search.
 * @returns void
 */
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

identify(index: number, item: GifData): string {
  return item.id;
}


}

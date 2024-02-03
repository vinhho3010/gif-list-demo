import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseSearch } from '../models/response_search.model';
import { GifData } from '../models/gif_data.model';
import { Pagination } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class GifService {
  api_key = 'yPGYX3aDbLgANP0zOEKLe7jrV2PulKNG';
  pingback_id = '18d6dffe7b4505c6';

  constructor(private http: HttpClient) { }

  getTrendingGifs(pagination?: Pagination): Observable<ResponseSearch<GifData>> {
    let params = new HttpParams();
    if(pagination) {
      params = params.append('limit', pagination.count.toString());
      params = params.append('offset', pagination.offset.toString());
    }
    params = params.append('api_key', this.api_key);
    return this.http.get('https://api.giphy.com/v1/gifs/trending', { params }) as Observable<ResponseSearch<GifData>>;
  }

  searchGifs(searchKey: string, pagination?: Pagination): Observable<ResponseSearch<GifData>> {
    let params = new HttpParams();
    if(pagination) {
      params = params.append('limit', pagination.count.toString());
      params = params.append('offset', pagination.offset.toString());
    }
    params = params.append('api_key', this.api_key);
    params = params.append('q', searchKey);
    return this.http.get('https://api.giphy.com/v1/gifs/search', { params }) as Observable<ResponseSearch<GifData>>;
  }

  getRelatedGifs(gifId: string, pagination?: Pagination): Observable<ResponseSearch<GifData>> {
    let params = new HttpParams();
    if(pagination) {
      params = params.append('limit', pagination.count.toString());
      params = params.append('offset', pagination.offset.toString());
    }
    params = params.append('api_key', this.api_key);
    params = params.append('pingback_id', this.pingback_id);
    params = params.append('gif_id', gifId);
    return this.http.get(`https://api.giphy.com/v1/gifs/related`, { params }) as Observable<ResponseSearch<GifData>>;
  }
}

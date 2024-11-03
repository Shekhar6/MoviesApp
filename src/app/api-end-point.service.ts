import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiEndPointService {

  constructor(private readonly apiService: HttpClient) { }


  public postApi(url: string):Observable<any>{
    return this.apiService.get(url);
  }

  public getMovieByid(url: string):Observable<any>{
    return this.apiService.get(url);
  }
}

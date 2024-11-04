import { CommonModule } from '@angular/common';
import { ApiEndPointService } from './api-end-point.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'https://image.tmdb.org/t/p/w500';
  data: any;
  myControl = new FormControl('Hindi');
  filteredOptions = [
    { option: 'Telugu', value: 1 },
    { option: 'Hindi', value: 2 },
    { option: 'Tamil', value: 3 },
  ];

  pageCount: number = 0;

  /**
   *
   */
  constructor(private apiEndPointService: ApiEndPointService) {}

  ngOnInit(): void {
    this.getMoviesByUrl(environment.HindiUrl);
  }
  private getMoviesByUrl(url: string): void {
    this.apiEndPointService.postApi(url).subscribe((x) => {
      this.data = x.results;
      this.title += this.data[0].poster_path;
   //   console.log(x.results);
    });
  }
  public getMovieById (id: number): void {
    const url = environment.getMovieDetails.replace('{id}',id.toString());
    this.apiEndPointService.getMovieByid(url).subscribe((x) => {
     // this.data = x.results;
     // this.title += this.data[0].poster_path;
      console.log(x);
    });
  }
  public getMovies(): void {
    const url = this.getMoviesUrl();
    this.getMoviesByUrl(url);
  }
  public getMoviesUrl(): string {
    let url;
    switch (this.myControl.value) {
      case 'Telugu':
        url = environment.indiaUrl;
        break;
      case 'Hindi':
        url = environment.HindiUrl;
        break;
      case 'Tamil':
        url = environment.tamilUrl;
        break;

      default:
        url = environment.HindiUrl;
        break;
    }
    return url;
  }

  public previousePage(): void {
    if (this.pageCount !== 0) {
      this.pageCount--;
      const newUrl = this.getMoviesUrl();
      const url = newUrl.replace('&page=1', '&page=' + this.pageCount);
      this.getMoviesByUrl(url);
    } else {
      this.getMoviesByUrl(environment.indiaUrl);
    }
  }
  public nextPage(): void {
    this.pageCount++;
    const newUrl = this.getMoviesUrl();
    const url = newUrl.replace('&page=1', '&page=' + this.pageCount);
    this.getMoviesByUrl(url);
  }
}

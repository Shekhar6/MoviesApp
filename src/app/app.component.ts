import { CommonModule } from '@angular/common';
import { ApiEndPointService } from './api-end-point.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'https://image.tmdb.org/t/p/w500';
  data: any;

  /**
   *
   */
  constructor(private apiEndPointService: ApiEndPointService) {
  }

  ngOnInit(): void {
    this.apiEndPointService.postApi().subscribe(x => {
      this.data = x.results;
      this.title += this.data[0].poster_path;
      console.log(x.results)
    }
    );
  }
}

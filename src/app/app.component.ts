// app.component.ts
import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  forecastWeatherData: any;
  currentWeatherData: any;
  groupedDate: any;
  errors: string[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.onSearch('');
  }

  onSearch(query: string) {

    this.searchService.search(query).subscribe({
      next: (response) => {
        if (response[0].cod == '404' || response[1].cod == '404') {
          this.errors.push('City not Found');
        }
        else {
          this.errors = [];
          this.forecastWeatherData = response[0]
          this.currentWeatherData = response[1]
          const groupedData = this.forecastWeatherData.list.reduce((acc: any, curr:any) => {
            const date = curr.dt_txt.split(' ')[0]; // Extract the date part
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(curr);
            return acc;
          }, {});

          this.groupedDate = Object.values(groupedData);

        }
      },
      error: (error) => {
        if (error.status === 404) {
          this.errors.push('City not Found');
        } else {
          this.errors.push(`Unexpected status code: ${error.status}`);
        }
      }
    });
  }
}

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

  async onSearch(query: string) {
    try {
      if (!query && navigator.geolocation) {
        const position = await this.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const response = await this.searchService.search('', latitude, longitude).toPromise();
        this.handleResponse(response);
        this.processWeatherData(response);
      } else if (query) {
        const response = await this.searchService.search(query).toPromise();
        this.handleResponse(response);
        this.processWeatherData(response);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private async getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  private processWeatherData(response: any): void {
    this.errors = [];
    const [forecastData, currentData] = response;

    if (forecastData.cod === '404' || currentData.cod === '404') {
      this.errors.push('City not Found');
      return;
    }

    this.forecastWeatherData = forecastData;
    this.currentWeatherData = currentData;

    const groupedData = this.forecastWeatherData.list.reduce((acc: any, curr: any) => {
      const date = curr.dt_txt.split(' ')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    }, {});

    this.groupedDate = Object.values(groupedData);
  }

  private handleError(error: any): void {
    if (error.status === 404) {
      this.errors.push('City not Found');
    } else {
      this.errors.push(`Unexpected status code: ${error.status}`);
    }
  }

  private handleResponse(response: any): void {
    // Implement handling of the response if needed
  }
}

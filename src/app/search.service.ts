// search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { concat, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(query: string, latitude?: number, longitude?: number): Observable<any[]> {
    const forecastWeatherUrl = `http://localhost:3000/forecast_weather/${query}`;
    const currentWeatherUrl = `http://localhost:3000/current_weather/${query}`;

    const forecastRequest = this.makeRequest(forecastWeatherUrl, latitude, longitude);
    const currentWeatherRequest = this.makeRequest(currentWeatherUrl, latitude, longitude);

    return forkJoin([forecastRequest, currentWeatherRequest]);
  }

  private makeRequest(url: string, latitude?: number, longitude?: number): Observable<any> {
    let params: any = {};

    if (latitude !== undefined && longitude !== undefined) {
      // Include geolocation data in the request params
      params = { params: { latitude: latitude.toString(), longitude: longitude.toString() } };
    }

    return this.http.get(url, { observe: 'response', ...params }).pipe(
      map((response: any) => response.body)
    );
  }
}

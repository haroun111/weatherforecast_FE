// search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<any[]> {
    if(query == "")
    {
      query = "paris"
    }
    const forecastWeather = `http://127.0.0.1:3000/forecast_weather/${query}`;
    const currentWeather = `http://127.0.0.1:3000/current_weather/${query}`;

    return forkJoin([
      this.http.get(forecastWeather, { observe: 'response' }).pipe(map(response => response.body)),
      this.http.get(currentWeather, { observe: 'response' }).pipe(map(response => response.body))
    ]);
  }
}

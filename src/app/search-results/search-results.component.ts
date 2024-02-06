// search-results.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.sass']
})
export class SearchResultsComponent {
  @Input() forecastWeatherData: any;
  @Input() currentWeatherData: any;
  @Input() groupedDate : any;
  @Input() errors: any;
}

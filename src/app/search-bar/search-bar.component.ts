import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: []
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();

  searchTerm: string = '';

  onSearch() {
    this.searchEvent.emit(this.searchTerm);
  }
}

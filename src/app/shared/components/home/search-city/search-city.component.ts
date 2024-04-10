import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css'],
})
export class SearchCityComponent {
  @Output() search = new EventEmitter<string>();
  query: string;

  constructor() {
    this.query = '';
  }

  public onSearch() {
    this.search.emit(this.query);
  }

  public clearInput() {
    this.query = '';
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css'],
})
export class SearchCityComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  query: string;

  constructor() {
    this.query = '';
  }
  ngOnInit(): void {
    this.query = 'Ribeirão Preto';
  }

  public onSearch() {
    this.search.emit(this.query);
  }

  public clearInput() {
    this.query = '';
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ICityByNominatim } from 'src/app/interfaces/nominatim.interface';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css'],
})
export class SearchCityComponent {
  @Output() search = new EventEmitter<string>();
  @Output() selectOption = new EventEmitter<ICityByNominatim>();
  @Input() options: ICityByNominatim[] | undefined;

  private searchSubject: Subject<string> = new Subject<string>();
  query: string;

  constructor() {
    this.query = '';
    this.searchSubject
      .pipe(
        switchMap(query =>
          timer(300).pipe(switchMap(() => this.searchCity(query)))
        )
      )
      .subscribe();
  }

  public onSearch() {
    this.searchSubject.next(this.query);
  }

  private async searchCity(query: string) {
    this.search.emit(query);
  }

  public onSelect(cityInfo: ICityByNominatim) {
    this.selectOption.emit(cityInfo);
    this.query = cityInfo.name;
    this.options = [];
  }

  public clearInput() {
    this.query = '';
    this.options = [];
  }
}

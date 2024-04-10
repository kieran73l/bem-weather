import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ICityByNominatim } from 'src/app/interfaces/nominatim.interface';
import { Query } from 'src/app/interfaces/query.interface';
import { Formatter } from 'src/app/shared/utils/formatter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NominatimService {
  private baseNominatimUrl: string;
  private queries: Query;

  constructor(
    private http: HttpClient,
    private formatter: Formatter
  ) {
    this.baseNominatimUrl = environment.nominatimUrl;
    this.queries = {
      q: '',
      limit: 10,
      format: 'json',
    };
  }

  private formatQuerySearch(city: string) {
    const cityArray = city.split(' ');
    return cityArray.join('+');
  }

  public async searchCity(city: string) {
    this.queries['q'] = this.formatQuerySearch(city);
    const query = this.formatter.queryFormat(this.queries);
    const url = `${this.baseNominatimUrl}${query}`;
    const result = await lastValueFrom(this.http.get<ICityByNominatim[]>(url));
    return result;
  }
}

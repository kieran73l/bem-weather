import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CityInfo } from '../interfaces/city-info';
import { WeatherConditions } from '../interfaces/weather-conditions';

interface Query {
  [key: string]: string | number | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherService {
  private baseOpenWeatherUrl: string;
  private pathCity: string;
  private queriesCity: Query;
  private pathWeather: string;
  private queriesWeather: Query;

  constructor(private http: HttpClient) {
    this.baseOpenWeatherUrl = environment.openWeatherUrl;
    this.pathCity = '/geo/1.0/direct';
    this.queriesCity = {
      appid: environment.openWeatherKey,
      q: '',
      limit: 1,
    };
    this.pathWeather = '/data/2.5/weather';
    this.queriesWeather = {
      appid: environment.openWeatherKey,
      lat: 0,
      lon: 0,
      lang: 'pt_br',
      units: 'metric',
    };
  }

  private queryFormat(query?: Query): string {
    if (!query) return '';

    const cleanedQuery: Query = {};
    for (const key in query) {
      if (
        Object.prototype.hasOwnProperty.call(query, key) &&
        query[key] !== undefined
      ) {
        cleanedQuery[key] = query[key];
      }
    }

    const queryString =
      Object.keys(cleanedQuery).length === 0
        ? ''
        : `?${Object.entries(cleanedQuery)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')}`;

    return queryString;
  }

  public async getCity(
    input: string
  ): Promise<never[] | CityInfo[] | undefined> {
    this.queriesCity['q'] = encodeURIComponent(input);
    const query = this.queryFormat(this.queriesCity);
    const url = `${this.baseOpenWeatherUrl}${this.pathCity}${query}`;

    return this.http.get<CityInfo[]>(url).toPromise();
  }

  public async getWeather(
    lat: number,
    lon: number
  ): Promise<WeatherConditions | undefined> {
    this.queriesWeather['lat'] = lat;
    this.queriesWeather['lon'] = lon;
    const query = this.queryFormat(this.queriesWeather);
    const url = `${this.baseOpenWeatherUrl}${this.pathWeather}${query}`;

    return this.http.get<WeatherConditions>(url).toPromise();
  }
}

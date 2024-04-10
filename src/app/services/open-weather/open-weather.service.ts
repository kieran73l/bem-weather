import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {
  ICityByOpenWeather,
  IWeatherByOpenWeather,
} from 'src/app/interfaces/open-weather.interface';
import { Query } from 'src/app/interfaces/query.interface';
import { Formatter } from 'src/app/shared/utils/formatter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherService {
  private baseOpenWeatherUrl: string;
  private pathCity: string;
  private queriesCity: Query;
  private pathWeather: string;
  private queriesWeather: Query;

  constructor(
    private http: HttpClient,
    private formatter: Formatter
  ) {
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

  public async getCity(
    input: string
  ): Promise<never[] | ICityByOpenWeather[] | undefined> {
    this.queriesCity['q'] = encodeURIComponent(input);
    const query = this.formatter.queryFormat(this.queriesCity);
    const url = `${this.baseOpenWeatherUrl}${this.pathCity}${query}`;
    const result = await lastValueFrom(
      this.http.get<ICityByOpenWeather[]>(url)
    );
    return result;
  }

  public async getWeather(
    lat: number,
    lon: number
  ): Promise<IWeatherByOpenWeather | undefined> {
    this.queriesWeather['lat'] = lat;
    this.queriesWeather['lon'] = lon;
    const query = this.formatter.queryFormat(this.queriesWeather);
    const url = `${this.baseOpenWeatherUrl}${this.pathWeather}${query}`;
    const result = await lastValueFrom(
      this.http.get<IWeatherByOpenWeather>(url)
    );
    return result;
  }
}

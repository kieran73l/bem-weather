import { Component, Input } from '@angular/core';
import {
  faCloud,
  faDroplet,
  faTemperatureHigh,
  faTemperatureLow,
  faTemperatureQuarter,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import { WeatherConditions } from 'src/app/interfaces/weather-conditions';

@Component({
  selector: 'app-card-weather',
  templateUrl: './card-weather.component.html',
  styleUrls: ['./card-weather.component.css'],
})
export class CardWeatherComponent {
  @Input() weatherInfo: WeatherConditions | undefined; // Initialize the weatherInfo property
  @Input() loading = false;

  constructor() {}
  skeletons: number[] = Array(6).map((x, i) => i);

  faTemperatureHigh = faTemperatureHigh;
  faTemperatureLow = faTemperatureLow;
  faTemperatureQuarter = faTemperatureQuarter;
  faDroplet = faDroplet;
  faCloud = faCloud;
  faWind = faWind;
}

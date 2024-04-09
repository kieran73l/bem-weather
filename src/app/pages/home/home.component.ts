import { Component, OnInit } from '@angular/core';
import { WeatherConditions } from 'src/app/interfaces/weather-conditions';
import { MapService } from 'src/app/services/map-service/map.service';
import { OpenWeatherService } from 'src/app/services/open-weather/open-weather.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public loading = false;
  public weatherInfo: WeatherConditions | undefined;

  constructor(
    private openWeatherService: OpenWeatherService,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.mapService.initMap([0, 0]);
    this.search('');
  }

  public async getWeatherByCity(
    input: string
  ): Promise<WeatherConditions | undefined> {
    const city = await this.openWeatherService.getCity(input);
    if (!city || city?.length === 0) {
      throw new Error('City not found');
    }
    const lat = city[0].lat;
    const lon = city[0].lon;
    this.mapService.alterLocation([lat, lon]);
    return this.openWeatherService.getWeather(lat, lon);
  }

  public async search(query: string) {
    if (!query) {
      Swal.fire({
        title: 'Por favor, insira uma cidade',
        icon: 'info',
        confirmButtonText: 'voltar',
      });
      return;
    }
    this.loading = true;
    try {
      const info = await this.getWeatherByCity(query);
      this.weatherInfo = info;
    } catch (error) {
      Swal.fire({
        title: 'Oops! Aconteceu algo de errado',
        text: 'Cidade não encontrada',
        icon: 'error',
        confirmButtonText: 'voltar',
      });
    }
    this.loading = false;
  }
}

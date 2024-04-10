import { Component, OnInit } from '@angular/core';
import { IWeatherByOpenWeather } from 'src/app/interfaces/open-weather.interface';
import { MapService } from 'src/app/services/map-service/map.service';
import { NominatimService } from 'src/app/services/nominatim/nominatim.service';
import { OpenWeatherService } from 'src/app/services/open-weather/open-weather.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public loading = false;
  public weatherInfo: IWeatherByOpenWeather | undefined;

  constructor(
    private openWeatherService: OpenWeatherService,
    private nominatimService: NominatimService,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.mapService.initMap([0, 0]);
  }

  public async getWeatherByCity(
    input: string
  ): Promise<IWeatherByOpenWeather | undefined> {
    const city = await this.nominatimService.searchCity(input);
    if (!city || city?.length === 0) {
      throw new Error('City not found');
    }
    const lat = Number(city[0].lat);
    const lon = Number(city[0].lon);

    const weather = await this.openWeatherService.getWeather(lat, lon);
    this.mapService.alterLocation([lat, lon]);

    return weather;
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
        title: 'Oops! Aconteceu algo de errado.',
        text: 'Cidade não encontrada',
        icon: 'error',
        confirmButtonText: 'voltar',
      });
    }
    this.loading = false;
  }
}

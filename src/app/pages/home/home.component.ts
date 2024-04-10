import { Component, OnInit } from '@angular/core';
import { ICityByNominatim } from 'src/app/interfaces/nominatim.interface';
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
  public options: ICityByNominatim[] | undefined;

  constructor(
    private openWeatherService: OpenWeatherService,
    private nominatimService: NominatimService,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.mapService.initMap([0, 0]);
  }

  private clearInfo() {
    this.options = [];
    this.weatherInfo = undefined;
  }

  public async search(input: string) {
    if (!input || input.length < 3) {
      return;
    }
    try {
      const cities = await this.nominatimService.searchCity(input);
      if (!cities || cities?.length === 0) {
        throw new Error('City not found');
      }
      this.options = cities;
    } catch (error) {
      this.clearInfo();
      Swal.fire({
        title: 'Oops! Aconteceu algo de errado.',
        text: 'Cidade não encontrada',
        icon: 'error',
        confirmButtonText: 'voltar',
      });
    }
  }

  public async onSelect(cityInfo: ICityByNominatim) {
    this.loading = true;
    try {
      const lat = Number(cityInfo.lat);
      const lon = Number(cityInfo.lon);
      const weather = await this.openWeatherService.getWeather(lat, lon);
      this.weatherInfo = weather;
      this.mapService.alterLocation([lat, lon]);
    } catch (error) {
      this.clearInfo();
      Swal.fire({
        title: 'Oops! Aconteceu algo de errado.',
        text: 'Erro ao buscar informações da cidade selecionada',
        icon: 'error',
        confirmButtonText: 'voltar',
      });
    }
    this.loading = false;
  }
}

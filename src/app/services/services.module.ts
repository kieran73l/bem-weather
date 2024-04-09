import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MapService } from './map-service/map.service';
import { OpenWeatherService } from './open-weather/open-weather.service';

const SERVICES = [OpenWeatherService, MapService];

@NgModule({
  providers: SERVICES,
  imports: [CommonModule],
})
export class ServicesModule {}

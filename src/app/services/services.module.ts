import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MapService } from './map-service/map.service';
import { NominatimService } from './nominatim/nominatim.service';
import { OpenWeatherService } from './open-weather/open-weather.service';

const SERVICES = [OpenWeatherService, MapService, NominatimService];

@NgModule({
  providers: SERVICES,
  imports: [CommonModule],
})
export class ServicesModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardWeatherComponent } from './components/home/card-weather/card-weather.component';
import { SearchCityComponent } from './components/home/search-city/search-city.component';

const COMPONENTS = [SearchCityComponent, CardWeatherComponent];
const IMPORTS = [
  CommonModule,
  MatInputModule,
  MatAutocompleteModule,
  MatOptionModule,
  ReactiveFormsModule,
  FormsModule,
  MatIconModule,
  MatButtonModule,
  FontAwesomeModule,
];
@NgModule({
  declarations: COMPONENTS,
  imports: IMPORTS,
  exports: COMPONENTS,
})
export class SharedModule {}

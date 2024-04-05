import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicesModule } from './services/services.module';
import { SharedModule } from './shared/shared.module';

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  SharedModule,
  ServicesModule,
];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: MODULES,
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

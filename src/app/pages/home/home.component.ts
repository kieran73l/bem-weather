import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private maps: L.Map;
  private marker: L.Marker;
  private location: L.LatLngExpression = [-21.21, -47.82];

  constructor() {
    this.maps = {} as L.Map;
    this.marker = {} as L.Marker;
  }

  private initMap(): void {
    this.maps = L.map('map', {
      center: this.location,
      zoom: 15,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.maps);

    this.addMarker(this.location);
  }

  private addMarker(location: L.LatLngExpression): void {
    this.marker = L.marker(location as L.LatLngExpression).addTo(this.maps);
  }

  public alterLocation(lat: number, long: number): void {
    const newLocation: L.LatLngExpression = [lat, long];
    if (this.marker) {
      this.maps.removeLayer(this.marker);
    }
    this.maps.setView(newLocation, 15);
    this.addMarker(newLocation);
  }

  ngOnInit() {
    this.initMap();
  }
}

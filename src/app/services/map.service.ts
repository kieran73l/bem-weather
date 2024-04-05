import { Injectable } from '@angular/core';
import L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private maps: L.Map;
  private marker: L.Marker;

  constructor() {
    this.maps = {} as L.Map;
    this.marker = {} as L.Marker;
  }

  // ngOnInit() {
  //   this.initMap([-21.21, -47.82]);
  // }

  public initMap(location: L.LatLngExpression): void {
    this.maps = L.map('map', {
      center: location,
      zoom: 12,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.maps);

    this.addMarker(location);
  }

  public addMarker(location: L.LatLngExpression): void {
    this.marker = L.marker(location as L.LatLngExpression).addTo(this.maps);
  }

  public alterLocation(location: L.LatLngExpression): void {
    if (this.marker) {
      this.maps.removeLayer(this.marker);
    }
    this.maps.setView(location, 12);
    this.addMarker(location);
  }
}

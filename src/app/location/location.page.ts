import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit, AfterViewInit {
  @ViewChild('map') mapElement!: ElementRef;
  map: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadMap();
  }

  async loadMap() {
    const coordinates = await Geolocation.getCurrentPosition();

    const latLng = new google.maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude); 

    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Mi Ubicación'
    });

    this.watchPosition();
  }

  watchPosition() {
    Geolocation.watchPosition({}, (position, err) => {
      if (position) {
        const newLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.setCenter(newLatLng);
        const marker = new google.maps.Marker({
          position: newLatLng,
          map: this.map,
          title: 'Mi Ubicación'
        });
      }
    });
  }
}

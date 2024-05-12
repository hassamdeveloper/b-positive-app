import {ModalController, Platform} from '@ionic/angular';
import { Component, Input, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { GmapsService } from 'src/app/Services/gmap.service';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-mapmodal',
  templateUrl: './mapmodal.page.html',
  styleUrls: ['./mapmodal.page.scss'],
})
export class MapmodalPage implements OnInit {

  @Input() Data:any;
  @ViewChild('map', {static: true}) mapElementRef: ElementRef;
  googleMaps: any;
  center = { lat: '', lng: '' };
  map: any;
  mapClickListener: any;
  markerClickListener: any;
  markers: any[] = [];
  public location:any = {lat:'', lng:''};

  constructor(
    private gmaps: GmapsService,
    private renderer: Renderer2,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.loadMap();
  }

  async loadMap() {
    const coordinates = await Geolocation.getCurrentPosition();
    try {
      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude);
      this.map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 16,
      });
      this.renderer.addClass(mapEl, 'visible');
      // this.addMarker(location);
      this.onMapClick();
    } catch(e) {
      console.log(e);
    }
  }

  onMapClick() {
    this.mapClickListener = this.googleMaps.event.addListener(this.map, "click", (mapsMouseEvent) => {
      console.log(mapsMouseEvent.latLng.toJSON());
      this.addMarker(mapsMouseEvent.latLng);
      // this.checkAndRemoveMarker(x)
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(this.map);
        }
    });
  }

  addMarker(location) {
    let googleMaps: any = this.googleMaps;
    const icon = {
      url: 'assets/location-outline.svg',
      scaledSize: new googleMaps.Size(50, 50), 
    };
    const marker = new googleMaps.Marker({
      position: location,
      map: this.map,
      icon: icon,
      // draggable: true,
      // animation: googleMaps.Animation.DROP
    });
    this.markers.push(marker);
    console.log(marker.position.lat());
    console.log(marker.position.lng());
    this.location.lat = marker.position.lat();
    this.location.lng = marker.position.lng();
    this.markerClickListener = this.googleMaps.event.addListener(marker, 'click', () => {
      console.log('markerclick', marker);
      // this.checkAndRemoveMarker(marker);
      console.log('markers: ', this.markers);
    });
    return marker;
  }
  setLocation() {
    this.cancel();
  }
  cancel() {
    return this.modalCtrl.dismiss(this.location, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.location, 'confirm');
  }
  // Destroy Map
  ionViewDidLeave() {
    this.googleMaps.setMap(null);
    this.googleMaps = null;
  }
}

import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ApicallService } from 'src/app/Services/apicall.service';

declare var google: any; // Declare the 'google' variable

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, AfterViewInit {
  @Input() public mapType: any = 'requests';
  @Input() public uid: any;
  @Output() public markerClick = new EventEmitter<any>();
  @Input() public bloodGroup: any = 'all';
  public mapMarkers: google.maps.Marker[] = [];
  public map: any;

  public constructor(private http: HttpClient) { }
  public ngAfterViewInit(): void {
    console.log(this.mapType);
    if (this.mapType == 'requests' && this.bloodGroup == 'all') {
      this.http.get('https://learn2earnn.com/products/bepositive/public/getDailyRequests/' + this.uid).subscribe(res => {
        this.initRequestersMap(res);
      })
    }
    else if (this.mapType == 'donos'){
      this.http.get('https://learn2earnn.com/products/bepositive/public/getlocation').subscribe(res => {
        this.initRequestersMap(res);
      })
    }
    else if(this.mapType == 'custom-requests' && this.bloodGroup != 'all'){
      this.http.get('https://learn2earnn.com/products/bepositive/public/getDailyRequestsByType/' + this.uid).subscribe((res:any[]) => {
        const requests = res.filter(request => request.blood_type == this.bloodGroup)
        this.initRequestersMap(requests);
      })
    }
    else if(this.mapType == 'custom-donos' && this.bloodGroup != 'all'){
      this.http.get('https://learn2earnn.com/products/bepositive/public/getlocation').subscribe((res:any[]) => {
        const requests = res.filter(request => request.blood_type == this.bloodGroup)
        this.initRequestersMap(requests);
      })
    }

  }
  public ngOnInit(): void {

  }

  async initRequestersMap(markers: any): Promise<void> {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const coordinates = await Geolocation.getCurrentPosition();
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude }, // Set your initial map center
      zoom: 16 // Set your initial zoom level
    });

    for (let marker of markers) {
      // Add advanced markers here using google.maps.Marker
      const markers = new google.maps.Marker({
        position: { lat: +marker.lat, lng: +marker.lng }, // Set marker position
        map: this.map,
        title: 'Marker Title', // Set marker title
        icon: { url: 'assets/svg/' + marker.blood_type + '.svg', scaledSize: new google.maps.Size(50, 50) },
        draggable: false,
        animation: google.maps.Animation.DROP,
      });
      markers.addListener('click', () => {
        this.onMarkerClick(marker);
      })
      this.mapMarkers.push(markers)
    }
  }
  public onMarkerClick(marker: any): void {
    console.log(marker)
    this.markerClick.emit(marker);
  }
}

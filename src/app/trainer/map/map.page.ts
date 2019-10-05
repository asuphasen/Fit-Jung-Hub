import { Component, OnInit, ViewChild, AfterContentInit, ElementRef, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent, CameraPosition, Environment, ILatLng, Marker } from '@ionic-native/google-maps';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { nightStyle } from './styles'
import { NavParams, ModalController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit, AfterContentInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: GoogleMap;

  address: any = {
    location: {
      latitude: "",
      longitude: ""
    },
    name: "",
    place: "",
  }
  isHasLoaction: boolean = false;
  mapMove: boolean = false;
  constructor(
    private geolocation: Geolocation,
    private _googleMaps: GoogleMaps,
    private http: HttpClient,
    private http2: HTTP,
    public ngZone: NgZone,
    // public navParams: NavParams,
    public modalController: ModalController,
    public navCtrl:NavController
  ) {

  }

  ngOnInit() {
    // this.address = this.navParams.get('address');
    // console.log(this.address)
    // console.log(this.address.location)
    this.getPlaces(new LatLng(18.319528, 99.399577))
  }

  ngAfterContentInit(): void {
    console.log('ffffffffffffffffffg')
    try {
      this.initMap()

    } catch (error) {
      console.log(error)
    }

  }
  initMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': environment.googleConfig.apiKey,
      'API_KEY_FOR_BROWSER_DEBUG': environment.googleConfig.apiKey
    });
    this.map = GoogleMaps.create('map', {
      styles: nightStyle,
      controls: {
        compass: false,
        myLocationButton: true,
        myLocation: true,
        indoorPicker: false,
        zoom: false,
        mapToolbar: false
      }
    });
    console.log("creact map")
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        console.log(resp)
        let loc: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
          console.log("map success")
          // let marker: Marker = this.map.addMarkerSync({
          //   title: 'Ionic',
          //   icon: 'blue',
          //   animation: 'DROP',
          //   draggable: true,
          //   position: loc
          // });

          // marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe((event) => {
          //   let markerlatlong = marker.getPosition();
          //   let options: CameraPosition<ILatLng> = {
          //     target: markerlatlong,
          //     zoom: 15,
          //     tilt: 10
          //   }
          //   this.map.moveCamera(options);
          //   this.getPlaces(new LatLng(markerlatlong.lat,markerlatlong.lng))
          // });
          this.getPlaces(loc)
          this.moveCamera(loc);
        });
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
    this.map.on(GoogleMapsEvent.MAP_DRAG_START).subscribe(() => {
      this.ngZone.run(() => {
        this.mapMove = true;
      })
    })
    this.map.on(GoogleMapsEvent.MAP_DRAG_END).subscribe(() => {
      this.ngZone.run(() => { 
        this.mapMove = false;
        let center = this.map.getCameraPosition().target;
        this.getPlaces(new LatLng(center.lat, center.lng))
      })
    })
  }
  moveCamera(loc: LatLng) {
    let options: CameraPosition<ILatLng> = {
      target: loc,
      zoom: 15,
      tilt: 10
    }
    this.map.moveCamera(options);
  }

  getPlaces(loc: LatLng) {
    var apiUrl = 'http://mongkail.com:8200/api/v1/maps/place';
    var query = `${loc.lat},${loc.lng}`;
    var url = `${apiUrl}?query=${query}&key=${environment.googleConfig.apiKey}`;
    console.log(url)
    this.http
      .get(url)
      .subscribe((data: any) => {
        if (data.status == "OK") {
          try {
            this.address = {
              location: {
                latitude: loc.lat,
                longitude: loc.lng
              },
              name: data.results[0].name,
              place: data.results[0].formatted_address
            }
            this.isHasLoaction = true;
          } catch (error) {
            this.isHasLoaction = false;
          }
        } else {
          this.isHasLoaction = false;
        }
      }, error => {
        this.isHasLoaction = false;
      })
  }


  close() {
    // this.modalController.dismiss();
    this.ngZone.run(()=>{
      this.navCtrl.back();
    })
    
  }

  save() {
    this.modalController.dismiss(this.address)
  }

}

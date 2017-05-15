import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


  declare var google;

  @Component({
    selector: 'map-page',
    templateUrl: 'map.html'
  })
  export class Map {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  coords=[];

  constructor(public navCtrl: NavController,private navParams:NavParams,private geolocation:Geolocation,private alert:AlertController) {

  }

  ionViewDidLoad(){
    this.loadMap();
  }
  loadMapGeo() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    });
  }

  loadMap(){
    //   let array = this.navParams.get('arr');
    // let latLng = new google.maps.LatLng(-34.9290, 138.6010);
    //
    // let mapOptions = {
    //   center: latLng,
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // }
    //
    //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //   for(let i  = 0;i<array.length;i++) {
    //     this.addMarker(array[i]);
    //   }

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });

  }

  addMarkerToCenter(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }
    addMarker(item){

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(item.lat, item.long)
      });

      let content = "<h4>Information!</h4>";

      this.addInfoWindow(marker, content);

    }
  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
    showAlert(title,subtitle) {
      let alert = this.alert.create({
        title: title,
        subTitle: subtitle,
        buttons: ['OK']
      });
      alert.present(prompt);
    }


  }

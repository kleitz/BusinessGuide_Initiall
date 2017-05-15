import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http,Headers,RequestOptions} from '@angular/http';
/**
 * Generated class for the Products page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class Products {
  products = [];
  company_id = -1;
  token;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private http: Http) {
    this.company_id = navParams.get('company_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Products');
  }

  ionViewWillEnter() {
    this.getProductsByCompanyRequest();
  }

  getProductsByCompanyRequest() {
    // let productsurl = "http://10.0.3.2:3000/secure/productsbycompany";
    let productsurl = "http://192.168.1.6:3000/secure/productsbycompany";
    this.storage.get('token').then((value) => {
      if (value != null) {
        this.token = value;
        let hdrs = new Headers({'token': value});
        let body = {'_id': this.company_id};
        this.http.post(productsurl, body, {headers: hdrs}).subscribe((data) => {
          let json = data.json();
          this.products = json;
        }, error => {
          console.log(error);
        })

      }
    })

  }
}

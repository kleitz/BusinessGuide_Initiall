import { Component } from '@angular/core';
import { NavController,NavParams,AlertController  } from 'ionic-angular';
import { CompanyDetailsPage } from '../company_details/company_details';
import { TabsPage } from '../tabs/tabs';
import { Favorites } from '../favorites/favorites'
import {Http,Headers,RequestOptions} from '@angular/http';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

 // categories: Array<{title: string, component: any,clicked: boolean}>;
 // subcategories: Array<{title: string}>;
  db: SQLiteObject;
  categories = [];
  subcategories = [];
  token:string;
  myInput = { val1: '', val2: ''};
  query: string = "";
  companies = [];
  public companies_holder = [];
  constructor(public navCtrl: NavController,public navParams: NavParams,private storage: Storage,private http:Http,
              private alert:AlertController, private sqlstorage: SQLite) {
    // debugger;
	 //  let a = navParams.get('kompanije');
	 //  if(a!=null)
	 //  {
		//   this.companies = new Array();
		//   for(var i = 0;i<a.length;i++)
	 //  {
		//   let item = a[i];
		//   this.companies.push(item);
	 //  }
	 // }

  }
  ionViewWillEnter(){
    document.getElementById('menu_button').hidden = false;
    this.getCompanyCategoriesRequest();
	//this.companies = this.navParams.get('companies');


    this.sqlstorage.create({
      name: 'data.db',
      location: 'default'
    }).then((pom: SQLiteObject) => {
      this.db = pom;
      this.db.executeSql('create table companies(name VARCHAR(32), latitude VARCHAR(20), longitude VARCHAR(20))', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  itemTapped(event,item)
  {
	  this.navCtrl.push(CompanyDetailsPage, {
      item: item
    });
  }

  // onInput(event) {
  //   debugger;
  //   this.companies = this.companies.filter(function(obj){
  //     return obj.title.includes(this.query)
  //   });
  // }
  onCancel(event) {

  }
  // onInputTime(data) {
  //   this.companies = this.companies.filter(function(obj){
  //
  //     return obj.title.includes(this.myInput.val1)
  //   });
  // }
  getItems(searchbar) {
    this.companies = this.companies_holder;
    var q = searchbar.srcElement.value;
    if (q.trim() == '') {
      return;
    }
    this.companies = this.companies.filter(function (obj) {
      return obj.title.includes(q)
    });


  }
  openCategory(category) {
    this.getProductCategoriesRequest(category._id);
  }
  openSubcategory(subcategory) {
    this.getCompaniesByProductCategoryRequest(subcategory._id);
    this.companies_holder = this.companies;
  }

  getCompanyCategoriesRequest() {
   // this.showAlert('upao','upao');
   //  let companyCategoriesUrl = "http://10.0.3.2:3000/secure/companycategories";
    let companyCategoriesUrl = "http://192.168.1.6:3000/secure/companycategories";

    this.storage.get('token').then ((value)=> {
      if(value!=null) {
        this.token = value;
        let hdrs = new Headers({'token': value});
        this.http.get(companyCategoriesUrl, {headers: hdrs}).subscribe((data) => {
          let json = data.json();
         // this.showAlert('json', json);
          this.categories = json;
        }, error2 => {
          this.showAlert(error2, error2);
        })
      } else {
        this.showAlert('Token','Token not found');
      }
    },error => {
      this.showAlert('token','token');
    })

  }
  getProductCategoriesRequest(id) {
   // let productCategoriesUrl = "http://10.0.3.2:3000/secure/productcategoriesbycompanycategory";
    let productCategoriesUrl = "http://192.168.1.6:3000/secure/productcategoriesbycompanycategory";
    if(this.token) {
      let hdrs = new Headers({'token':this.token});
      let body = {'_id':id};
      this.http.post(productCategoriesUrl,body,{headers:hdrs}).subscribe((data)=> {
        let json = data.json();
        this.subcategories = json;
      },error => {
        console.log(error);
      })

    }
  }
  getCompaniesByProductCategoryRequest(id){
    // let companiesUrl = "http://10.0.3.2:3000/secure/companiesbyproductcategory";
    let companiesUrl = "http://192.168.1.6:3000/secure/companiesbyproductcategory";
    if (this.token) {
      let hdrs = new Headers({'token': this.token});
      let body = {'_id': id};
      this.http.post(companiesUrl, body, {headers: hdrs}).subscribe((data) => {
        let json = data.json();
        this.companies = json;
      }, error => {
        console.log(error);
      })
    }
  }
  showAlert(title,subtitle) {
    let alert = this.alert.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
  openFavorites() {
    this.navCtrl.push(Favorites);
  }


}

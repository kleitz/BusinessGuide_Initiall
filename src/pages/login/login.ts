import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController, Loading } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import {Http,Headers,RequestOptions} from '@angular/http';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { SearchPage } from '../search/search';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  loading: Loading;
  registerCredentials = { email: '', password: '',username: '' };
  constructor(public nav: NavController, public navParams: NavParams, private auth: Auth, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,private http:Http,private storage:Storage,private file:File ) {
    this.http = http;
    this.storage = storage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
  public createAccount() {
    this.nav.push('RegisterPage');
  }
  public login() {
    // this.showLoading()
    // this.auth.login(this.registerCredentials).subscribe(allowed => {
    //     if (allowed) {
    //       this.nav.setRoot('HomePage');
    //     } else {
    //       this.showError("Access Denied");
    //     }
    //   },
    //   error => {
    //     this.showError(error);
    //   });
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
  showAlert(title,subtitle) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  loginRequest() {
    // let loginUrl:string = "http://10.0.2.2:3000/login";
    let loginUrl:string = "http://192.168.1.6:3000/login";
    let body = {
      username:this.registerCredentials.username,
      password: this.registerCredentials.password
    };
    return this.http.post(loginUrl,body)
      .subscribe(data=> {
        let json = data.json();
        this.storage.set('token',json.token).then(()=> {
          this.storage.get('token').then((value)=> {
            console.log(value);
            document.getElementById('login_button').hidden=true;
            document.getElementById('signup_button').hidden=true;
            document.getElementById('username_label').hidden=false;
           // document.getElementById('user_image').hidden=false;
            document.getElementById('logout_button').hidden=false;
            //treba da se pojavi labela se korisnickim imenom i dugme logout
            let pom = json.picture;
            this.file.writeFile(this.file.dataDirectory,'UserPicture',pom,{replace:true}).then(()=>{
              console.log('upisana slika');
              this.storage.set('loggedin',true);
              this.storage.set('username',json.username);
              this.storage.set('email',json.email);
              console.log('ulogovan');
           //   this.showAlert('Sucess','You are logged in');
              this.nav.setRoot(SearchPage);
            },error => {
           //   this.showAlert("Error","Error while saving picture");
              console.log('losa slika');
              console.log(error);
              let alert = this.alertCtrl.create({
                title:'error',
                subTitle: error.toString(),
                buttons: ['OK']
              });
              alert.present(prompt);
            });
          })
        })
      },error => {
        console.log((error));
          let alert = this.alertCtrl.create({
            title:'error',
            subTitle: error.toString(),
            buttons: ['OK']
          });
          alert.present(prompt);
     //   this.showAlert("Error",error);
        return false;
        }
      );

  }

}

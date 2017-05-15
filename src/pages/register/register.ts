import { Component } from '@angular/core';
import { NavController,NavParams, AlertController, IonicPage } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Http,Headers,RequestOptions} from '@angular/http';
import {subscribeOn} from "rxjs/operator/subscribeOn";
//import { Storage,SqlStorage } from 'ionic-framework/ionic';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';


/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {
  public base64Image: string;
  createSuccess = false;
  registerCredentials = { email: '', password: '' , username: ''};
  constructor(public nav: NavController, public navParams: NavParams,private auth: Auth,
              private alertCtrl: AlertController,private camera:Camera,public http:Http,
              private storage:Storage,private file:File) {
    this.storage=storage;

  }

  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 300,
      targetHeight: 300
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
    },(err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }
  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("Success", "Account created.");
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }


  signupRequest() {
    this.base64Image = "slika";
    if (this.base64Image != null) {
      // let registerUrl: string = "http://10.0.2.2:3000/signup";
      let registerUrl: string = "http://192.168.1.6:3000/signup";
      let body = {
        username: this.registerCredentials.username,
        email: this.registerCredentials.email,
        password: this.registerCredentials.password,
        picture: this.base64Image
      };
      return this.http.post(registerUrl, body)
        .subscribe(data => {
          console.log(data);
          //let json = data.json();
          // this.storage.set('token', json.token).then(() => {
          //   this.storage.get('token').then((value) => {
          //    console.log(value);
          //  })
          //  })
          this.showPopup('Success', 'Account successfully created. Check your email to verify');


        }, error => {
          console.log(error);
          this.showPopup("Error", "Problem creating account.");
          this.showPopup("Error", error);

        });
    }
    else {
      this.showPopup("Error", "Take a picture to complete sign up");
    }
  }

}

import { Component } from '@angular/core';
import { Auth } from '../../providers/auth';

import { SearchPage } from '../search/search';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MenuController } from 	'ionic-angular';
import { Login } from '../login/login'
import { Register } from '../register/register';
import { NavController,NavParams }  from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  username = '';
  email = '';
  imgSrc = '';


  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = ContactPage;

  constructor(public menu:MenuController,private auth: Auth,public nav: NavController, public navParams: NavParams,
              private storage:Storage,private file:File) {
	//this.menu.enable(false);
    this.auth = auth;
    this.nav = nav;
  }

  ionViewWillEnter()
  {
     this.storage.get('loggedin').then((isLogged) => {
       console.log(isLogged);
       //treba da se pojavi labela se korisnickim imenom i dugme logout
       if(isLogged) {
         this.storage.get('username').then((username) => {
           this.username=username;
           this.storage.get('email').then((email) => {
             this.email = email;
             this.file.readAsText(this.file.dataDirectory,'UserPicture').then((picture)=>{
               this.imgSrc = picture;
             })
             document.getElementById('login_button').hidden = true;
             document.getElementById('signup_button').hidden = true;
             document.getElementById('username_label').hidden=false;
          //   document.getElementById('user_image').hidden=false;
             document.getElementById('logout_button').hidden=false;

           })
         })
       }
       else {
         document.getElementById('login_button').hidden = false;
         document.getElementById('signup_button').hidden = false;
         document.getElementById('username_label').hidden=true;
       //  document.getElementById('user_image').hidden=true;
         document.getElementById('logout_button').hidden=true;
       }
     },error=>{
       console.log(error);
       console.log('neverLoggedId');
       this.storage.set('loggedin',false);
     });
    }



  openLogInPage()
  {
    this.nav.push(Login);
  }

  openSignUpPage()
  {
    this.nav.push(Register);
  }
}

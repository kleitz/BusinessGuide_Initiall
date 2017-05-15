import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Auth } from '../providers/auth';
import { MessageService } from '../providers/message-service';

import { SearchPage } from '../pages/search/search';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CompanyDetailsPage } from '../pages/company_details/company_details';
import {Login } from '../pages/login/login';
import {Register } from '../pages/register/register';
import { Map } from '../pages/map/map';
import { Favorites } from '../pages/favorites/favorites'
import { Products } from '../pages/products/products'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Camera} from "@ionic-native/camera";
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SQLite } from '@ionic-native/sqlite';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    ContactPage,
    HomePage,
    TabsPage,
	  CompanyDetailsPage,
    Login,
    Register,
    Map,
    Favorites,
    Products
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    ContactPage,
    HomePage,
    TabsPage,
	  CompanyDetailsPage,
	  Login,
	  Register,
    Map,
    Favorites,
    Products
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Auth,
    MessageService,
    Camera,
    File,
    Geolocation,
    GoogleMaps,
    SQLite,
    SocialSharing
  ]
})
export class AppModule {}

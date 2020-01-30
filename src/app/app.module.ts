import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule} from '@ionic/storage';
import { Geolocation} from '@ionic-native/geolocation/ngx'; 
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import { ReactiveFormsModule  }   from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, NgbModule.forRoot(),HttpClientModule, IonicStorageModule.forRoot(), ReactiveFormsModule  ],
  providers: [
    Geolocation,
    NativeGeocoder,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

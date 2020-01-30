import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { RestapiService } from './restapi.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  menudata:"";
  loggedStatus:number;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService:StorageService,
    private router:Router,
    private restapiService: RestapiService,
    private loadingCtrl: LoadingController
    
  ) {
    this.initializeApp();
    this.loginStatus();
    
  }
  loader(page) {
    this.loadingCtrl.create({
      message:"Please wait",
      duration:1500
    }).then((res) => {
      res.present();
      this.router.navigate(page);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  loginStatus()
  { 
    this.storageService.getStore('sabjiuser').then(res=>
      {
        if(res==null)
        {
          this.loggedStatus=0;
        }
        else{
          this.restapiService.userData(res.user_id,res.API_key).subscribe(res=>
            {
              this.menudata=res;
            });
          this.loggedStatus=1;
          
        }
      });
  }

  logout()
  { 
    this.storageService.clear().then(()=>
      {
        this.router.navigate(['login']).then(()=>
        {
          window.location.reload();
        });
      });
    
  }
}


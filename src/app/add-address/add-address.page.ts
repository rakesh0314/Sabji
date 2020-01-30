import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderReverseResult } from '@ionic-native/native-geocoder/ngx';
import { StorageService } from '../storage.service';
import { RestapiService } from '../restapi.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var google;

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  logged:number;
  useradd = {
    email:"",
    house_no:"",
    street_no:"",
    landmark:"",
    city:"",
    zip_code:"",
    id:"",
    category:"Home"
  }

  constructor(private geoLocation:Geolocation,
    private nativeGeoCoader: NativeGeocoder,
    private storageService:StorageService,
    private restapiService: RestapiService,
    private activeRoute:ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    
    let type = this.activeRoute.snapshot.paramMap.get('type');
    if(type=='reg')
    {
      this.logged=0;
    }else{
      this.logged=1;
    }
    this.storageService.getStore('sabjiuser').then(res=>
      {
        
        this.useradd.id    = res.user_id;
        this.restapiService.userData(res.user_id,res.API_key).subscribe(res=>
            {
              this.useradd.email = res.clt_email;
            });
      });
  }

  addaddress()
  { 
    let type = this.activeRoute.snapshot.paramMap.get('type');
    if(type=='reg')
    {
      this.restapiService.addAddress(this.useradd).subscribe(res=>
        {
            this.router.navigate(['home']);
        });
    }else{
      this.restapiService.addnewaddress(this.useradd).subscribe(res=>
        {
            this.storageService.setstore('useradd',this.useradd).then(()=>
            { 
              console.log('okkkkk');
              this.router.navigate(['deliveryaddress/del']);
            });
        });
    }
  }

  selectcat(cate)
  {
    this.useradd.category = cate;
  }


}

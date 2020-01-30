import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  public userData = {
    contact:"",
    otp:"",
    lat:"",
    lng:""
  }
  signupform: FormGroup;
  validation:number;

  
	
  constructor(private restapiService: RestapiService, 
    private geolocation:Geolocation,
    private router:Router,
    public formBuilder:FormBuilder,
    private storageService:StorageService) { }

  ngOnInit() {
    this.validationfunc();
    this.restapiService.showloader();
  }

  sendotp(lat, lng)
  {
      this.restapiService.showloader();
      this.restapiService.getotp(this.userData.contact).subscribe(res=>
        {
          if(res.status=='true')
          {
            this.userData.lat = lat;
            this.userData.lng = lng;
            this.userData.otp = res.otp;
            this.storageService.setstore('reg_user',this.userData).then(res=>
              {
                this.router.navigate(['verifyotp/reg']);
              });
          }else{
            let msg ="This User is Already Registered";
            this.restapiService.showWarnMsg(msg);
            this.router.navigate(['registration']);
          }
        });
  }

  geoLocation()
  {
    
    if(this.signupform.valid)
    {
      this.geolocation.getCurrentPosition(
        {maximumAge: 1000, timeout: 5000,
        enableHighAccuracy: true }
        ).then((resp) => {
              // resp.coords.latitude
              // resp.coords.longitude
              //alert("r succ"+resp.coords.latitude)
              // alert(resp.coords.latitude);
              this.sendotp(resp.coords.latitude,resp.coords.longitude);
              },er=>{
                //alert("error getting location")
                let msg = 'Can not retrieve Location';
                this.restapiService.showMsg(msg);
              }).catch((error) => {
              //alert('Error getting location'+JSON.stringify(error));
              this.restapiService.showMsg(error);
              this.sendotp('00','00');
              });
            }else{
              this.restapiService.showWarnMsg('Please enter Mobile number')
            }
  }

  validationfunc()
  {
    // let EMAILPATTERN = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    this.signupform = this.formBuilder.group({
      // first_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
      // password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      // c_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      contact: new FormControl('', [Validators.required, Validators.pattern('[0-9 ]*'), Validators.minLength(10), Validators.maxLength(10)]),
      // email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
  }



}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.page.html',
  styleUrls: ['./verifyotp.page.scss'],
})
export class VerifyotpPage implements OnInit {

  enterotp ={
    first: "",
    second:"",
    third:"",
    fourth:""
  }

  disablebutton:number;
  resendotp:number;


  constructor(private activeRuute:ActivatedRoute,
    private storageService:StorageService,
    private restapiService:RestapiService,
    private router:Router) { }

  ngOnInit() {
  }

  validinputs()
  {
    let otp1 = this.enterotp.first.trim();
    let otp2 = this.enterotp.second.trim();
    let otp3 = this.enterotp.third.trim();
    let otp4 = this.enterotp.fourth.trim();
    return(this.enterotp.first&&this.enterotp.second&&this.enterotp.third&&this.enterotp.fourth&&otp1.length>0&&otp2.length>0&&otp3.length>0&&otp4.length>0);
  }

  checkotp()
  {
    this.disablebutton=1;
    const otp =this.enterotp.first+this.enterotp.second+this.enterotp.third+this.enterotp.fourth;
    let type = this.activeRuute.snapshot.paramMap.get('url');
      if(this.validinputs()){
          this.storageService.getStore('reg_user').then(res=>
            {
              if(otp==res.otp)
              { 
                this.restapiService.showloader();
                if(type=='reg')
                {
                  this.restapiService.sighupGetDetails(res).subscribe((result:any)=>
                  {
                      this.storageService.remove('reg_user').then(res=>
                        {
                          this.storageService.setstore('reguser',result);
                          this.router.navigate(['reguserdetails']);
                        });
                  },
                  (error:any)=>
                  {
                    this.disablebutton=0;
                    let msg = 'Network Error';
                    this.restapiService.showWarnMsg(msg);
                  });
                }else{
                  this.router.navigate(['edit-password']);
                }
              }else
              {
                this.disablebutton=0;
                let msg ="You Entered Wrong OTP";
                this.restapiService.showWarnMsg(msg);
              }
            });
      }else{
        this.disablebutton=0;
        this.restapiService.showMsg('Please enter your otp');
      }
  }

  otpController(event,next,prev){
    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     return 0;
    }
  }

  Resendotp()
  { 
    this.resendotp=1;
    this.storageService.getStore('reg_user').then(res=>
      {
        this.restapiService.resenOtp(res.otp,res.contact).subscribe(res=>
          {
            this.restapiService.showMsg('We send otp in entered contact number ');
          })
      });
  }
 

}

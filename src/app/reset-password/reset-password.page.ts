import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  phone:"";
  valid:boolean;

  constructor(private restapiService: RestapiService,
    private storageService: StorageService,
    private router:Router) {
      this.valid = true;  }

  ngOnInit() {
  }

  validInput()
  {
    let contact = this.phone.trim();
    if(this.phone&&contact.length>9)
    {
      this.valid = true;
      return true;
    }else{
      this.valid = false;
      return false;
    }
  }

  getotp()
  {
    if(this.validInput())
    {
      this.restapiService.passwordotp(this.phone).subscribe(res=>
        {
          if(res.status=='true'){
            this.storageService.setstore('reg_user',res).then(()=>
              {
                this.router.navigate(['verifyotp/pass']);
              });
          }else{
            this.restapiService.showWarnMsg('This number is not registered');
          }
        });
      }
  }

}

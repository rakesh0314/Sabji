import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.page.html',
  styleUrls: ['./edit-password.page.scss'],
})
export class EditPasswordPage implements OnInit {
  password ={
    'pass1':"",
    'pass2':""
  }

    passvalid1:boolean;
    passvalid11:boolean;
    passvalid2:boolean;
    passmatch:boolean;


  constructor(private restapiService: RestapiService,
    private storageService:StorageService,
    private router: Router) {
      this.passvalid1=true;
      this.passvalid11=true;
      this.passvalid2=true;
      this.passmatch = true;
     }

  ngOnInit() {
  }


  validInputs1()
  {
    if(this.password.pass1.length==0)
    {
      this.passvalid1= false;
      return false;
    }else if(this.password.pass1.length<8)
    {
      this.passvalid11= false;
      this.passvalid11= true;
      return false;
    }else{
      this.passvalid1= true;
      this.passvalid11= true;
      return true;
    }
  }
  validInputs2()
  {
    if(this.password.pass2.length<8)
    {
      this.passvalid2 = false;
      return false;
    }
    else if(this.password.pass2!=this.password.pass1)
    {
      this.passmatch = false;
      this.passvalid2=true;
      return false;
    }else{
      this.passvalid2=true;
      this.passmatch = true;
      return true;
    }
  }

  resetpassword()
  {
    if(this.validInputs1()&&this.validInputs2())
    {
      this.storageService.getStore('reg_user').then(res=>
        {
          this.restapiService.resetpassword(res.phone,this.password).subscribe(()=>
          {
            this.restapiService.showMsg('Password change Successfully');
            this.router.navigate(['login']);
          });
        });
    }
    
  }

}

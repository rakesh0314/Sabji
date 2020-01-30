import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

// export class SegmentExample {
  
// }
export class LoginPage implements OnInit {

  public postData ={
    'username':"",
    'password':""
  }
  loggedStatus:number;
  
  keyname = "sabjiuser";
  storData:any;
	segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  constructor(private restapiService:RestapiService, private router:Router, private storageService:StorageService) { }

  ngOnInit() {
    this.restapiService.showloader();
  }

  validInputs()
  {
    let username =this.postData.username.trim();
    let password = this.postData.password.trim();
    return(this.postData.username&&this.postData.password&&username.length>0,password.length>0);
  }

  loginDo()
  {
    if(this.validInputs())
    {
      this.restapiService.login(this.postData)
      .subscribe((res:any)=>
      {
        if(res.status=='true')
        {
          let msg ="Login Success";
          this.restapiService.showMsg(msg);
          this.storageService.setstore('sabjiuser',res);
          setTimeout(() => {
            this.router.navigate(['home']).then(()=>
            {
              window.location.reload();
            });
            
          }, 500);
        }
        else{
          let msg = 'Username Or Password Wrong';
          this.restapiService.showWarnMsg(msg);
        }
      },
      (error:any)=>
      {
        let msg = 'Network Error';
        this.restapiService.showWarnMsg(msg);
      });
    }
    else{
      let msg = 'Fill All Fields';
        this.restapiService.showWarnMsg(msg);
    }
  }

}

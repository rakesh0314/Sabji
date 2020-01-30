import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {

userData:"";
  storekey= 'sabjiuser';
  storedata = {'status':'false'};
  data:"";
  constructor(private restapiService:RestapiService, private storageService:StorageService, private router:Router) 
  {
    storageService.getStore(this.storekey).then((res:any)=>
    {
      this.data= res;
      if(this.data!=null)
      {
        restapiService.userData(res.user_id,res.API_key).subscribe(res=>{this.userData=res;});
      }else{
        let msg = 'Please Login First';
        restapiService.showWarnMsg(msg);
        router.navigate(['login']);
      }
    });
   }

  ngOnInit() {
    this.restapiService.showloader();
  }

  logout()
  { 
    this.storageService.remove(this.storekey).then(res=>
      {this.router.navigate(['login']);});
    
  }

}

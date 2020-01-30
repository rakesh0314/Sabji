import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-reguserdetails',
  templateUrl: './reguserdetails.page.html',
  styleUrls: ['./reguserdetails.page.scss'],
})
export class ReguserdetailsPage implements OnInit {
  userdetails: FormGroup;
  public userData = {
    first_name:"",
    password:"",
    c_password:"",
    id:""
  }

  checktnc:false;

  constructor(private formBuilder:FormBuilder,
    private restapiService: RestapiService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private storageService: StorageService) { }

  ngOnInit() {
    this.userdetails = this.formBuilder.group({
      first_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      c_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    this.restapiService.showloader();
    this.userid();
  }

  validInputs()
  {
    let first_name = this.userData.first_name.trim();
    let password   = this.userData.password.trim();
    let c_password = this.userData.c_password.trim();

    return(this.userData.first_name&&this.userData.password&&this.userData.c_password&&first_name.length>0&&password.length>0&&c_password.length>0)
  }

  userUpdate()
  {
    if(this.validInputs())
    {
      if(this.userData.password==this.userData.c_password)
      {
        this.restapiService.updateuser(this.userData).subscribe(result=>
        {
          this.storageService.remove('reguser');
          if(result.status=="true")
          {
            this.storageService.setstore('sabjiuser',result).then(()=>
            {
              window.location.replace('add-address/reg');
            })
          }
        });
      }else{
        this.restapiService.showWarnMsg('Password not match');
      }
    }else{
      this.restapiService.showWarnMsg('Enter All inputs');
    }
  }

  userid()
  {
      this.storageService.getStore('reguser').then(res=>
        {
          this.userData.id = res.id;
        });
  }

}

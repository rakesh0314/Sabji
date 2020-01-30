import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

 contact ={
    name:"",
    email:"",
    massage:""
  }

  constructor(private restapiService:RestapiService, private router:Router) { }

  ngOnInit() {
    this.restapiService.showloader();
  }

  validInputs()
  {
    let email = this.contact.name.trim();
    let name  = this.contact.email.trim();
    let massage=this.contact.massage.trim();

    return(this.contact.email&&this.contact.name&&this.contact.massage&&email.length>0&&name.length>0&&massage.length>0)
  }

  ContactUs()
  {
    if(this.validInputs())
    {
      this.restapiService.showloader();
      this.restapiService.ContactusSabji(this.contact).subscribe(res=>
        {
          let msg = "Massage Send...";
          this.restapiService.showMsg(msg);
          this.router.navigate(['home']);
        });
    }else{
      this.restapiService.showWarnMsg('please fill all filds');
    }
  }

}

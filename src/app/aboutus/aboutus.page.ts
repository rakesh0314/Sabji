import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {
  data:any;
  content:string;

  constructor(private restapiService:RestapiService, private router:Router) 
  {
   }

  ngOnInit() {
    this.restapiService.showloader();
    this.restapiService.aboutus().subscribe(res=>
      {
        this.data = res;
      });
  }

}

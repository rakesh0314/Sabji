import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  terms :"";
  constructor(private restapiService:RestapiService) { }

  ngOnInit() {
    this.restapiService.myterms().subscribe(res=>
      {
        this.terms = res;
      });
  }

}

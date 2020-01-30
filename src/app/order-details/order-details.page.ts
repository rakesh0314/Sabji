import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestapiService } from '../restapi.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  order:"";
  url="https://sabji.co.in/";

  constructor(private activeRuute: ActivatedRoute,
    private restapiService:RestapiService,
    private storageService:StorageService,) { }

  ngOnInit() {
    this.restapiService.showloader();
    let order_id = this.activeRuute.snapshot.paramMap.get('id');
    const key ="sabjiuser";
    this.storageService.getStore(key).then(res=>
    {
      this.restapiService.orderDetails(res,order_id).subscribe(res=>
      {
        this.order = res;
      });
    });
  }

}

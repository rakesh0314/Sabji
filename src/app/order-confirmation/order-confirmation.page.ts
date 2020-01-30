import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  data:"";

  constructor(private restapiService:RestapiService, private storageService: StorageService) { }

  ngOnInit() {
    const key ="sabjiuser";
    this.storageService.getStore(key).then(res=>
      {
        this.restapiService.getOrderconfirm(res).subscribe(res=>
        {
          this.data = res; 
        });
      });
  }

}

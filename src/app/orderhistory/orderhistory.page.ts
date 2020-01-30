import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.page.html',
  styleUrls: ['./orderhistory.page.scss'],
})
export class OrderhistoryPage implements OnInit {
  order:"";

  constructor(private restapiService:RestapiService,
    private storageService: StorageService,) { }

  ngOnInit() {
    this.restapiService.showloader();
    const key ="sabjiuser";
    this.storageService.getStore(key).then(res=>
      {
        this.restapiService.orderHistory(res).subscribe(res=>
          {
            this.order =res;
            console.log(this.order);
          });
      });
  }

}

import { Component, OnInit, NgZone  } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deliveryaddress',
  templateUrl: './deliveryaddress.page.html',
  styleUrls: ['./deliveryaddress.page.scss'],
})
export class DeliveryaddressPage implements OnInit {
  address:"";
  userData:"";
  curadd:"";

  constructor(private restapiService: RestapiService,
  private storage: StorageService, 
  private router :Router,
  private activeRoute: ActivatedRoute,
  private zone: NgZone) { }

  ngOnInit() {
    
  }

  ionViewWillEnter()
  {
    this.restapiService.showloader();
    this.storage.getStore('sabjiuser').then(res=>
    {
      this.restapiService.clientAdd(res).subscribe(res1=>
        {
          this.address = res1;
        })
    });
    this.currentAddress();
  }

  currentAddress()
  {
    this.storage.getStore('useradd').then(res=>
      {
        this.curadd = res;
      })
  }

  selectadd(row)
  {
    let type = this.activeRoute.snapshot.paramMap.get('url');
    this.curadd =row;
    this.storage.setstore('useradd',row).then(()=>
    {
      if(type=='url'){
        this.router.navigate(['payment-options']);
      }
    });
  }

}

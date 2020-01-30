import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestapiService } from '../restapi.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  product:"";
  row=0;
  storekey="sabjiuser";
  constructor(
    private activatedRoute:ActivatedRoute, 
    private restapiService:RestapiService, 
    private storageService:StorageService,
    private router:Router) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id'); 
    this.restapiService.productDetails(id).subscribe(res=>
      {
        this.product = res;
      })
  }

  ChangeQty(event)
  {
    this.row = event.target.value;
  }

  addToCart(proId,unit)
  {
    let data:"";
    this.storageService.getStore(this.storekey).then((res:any)=>
    {
      if(res.status=='true')
      {

        this.restapiService.AddMyCart(proId,unit,res.user_id,res.API_key).subscribe((res:any)=>
        {
          if(res.status=="true")
          {
            this.router.navigate(['cart']);
          }else{
            let msg = 'This Product Is Also in Your Cart';
            this.restapiService.showMsg(msg);
          }
        });

      }else{
        let msg = 'Please Login First';
        this.restapiService.showMsg(msg);
        this.router.navigate(['login']);
      }
    });
  }

}

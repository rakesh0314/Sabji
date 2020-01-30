import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartProduct:any;
  prodUnit:any;
  storekey= 'sabjiuser';
  total=0.00;
  prodQty=0;
  delCharge:number;
  totalAmount:number;
  price:number;


  constructor(private restapiService:RestapiService, private storageService:StorageService, private router:Router) 
  { 
   }

  ngOnInit() {
    
    this.getProduct();
  }

  getProduct()
  {
    this.storageService.getStore(this.storekey).then((res:any)=>
    {
      if(res.status=='true')
      {
        this.restapiService.getCart(res.user_id,res.API_key).subscribe(res=>
          {
            this.cartProduct=res;
            if(res=='')
            {
              let msg ="No Product In Yours Card";
              this.restapiService.showMsg(msg);
            }else{
              for(let i =0;i<res.length;i++)
              {
                this.cartProduct[i].quantity =1;
              }  
                this.countTotal();
            }
          });
      }else{ 
        this.router.navigate(['login']);
      }
    });
  }

  qtyPlus(row){
    this.cartProduct[row].quantity++;
    console.log(this.cartProduct);
    this.countTotal();
  }
  qtyMinus(row){
    this.cartProduct[row].quantity--;
    if(this.cartProduct[row].quantity<1)
    {
      this.storageService.getStore(this.storekey).then((res:any)=>
      {
        if(res.status=="true")
        {
          this.restapiService.deleteCart(this.cartProduct[row].cart_id,res.user_id,res.API_key).subscribe(res=>
            {
              this.cartProduct ="";
              this.cartProduct = res;
              if(res=='')
              {
                console.log('No Product In Your Cart');
              }else{
                for(let i =0;i<res.length;i++)
                {
                  this.cartProduct[i].quantity =1;
                }
                console.log(this.cartProduct);  
                  this.countTotal();
              }
            });
        }
      });
    }
    this.countTotal();
  }

  countTotal()
  {
    this.total=0.00;
    this.prodQty=0;
    for(let i=0;i<this.cartProduct.length;i++)
    {
      this.price = this.cartProduct[i].sellprice*this.cartProduct[i].quantity;
      this.total = +this.price + +this.total;
      this.prodQty++;
    }
      this.delCharge = this.total*13/100;
      this.totalAmount = this.total+ this.delCharge;
  }

  ProcessOrder(data)
  {
    this.restapiService.showloader();
    const key ="userCart";
    this.storageService.setstore(key,data).then(res=>
      {
        this.router.navigate(['payment-options']);
      });
  }

}

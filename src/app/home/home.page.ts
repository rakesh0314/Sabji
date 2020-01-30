import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  product:any;
  storekey="sabjiuser";
  cate:any;
  url="https://sabji.co.in";
  mrpvar=0;
  searchItem:"";
  banner:"";

  sliderConfig =
  {
    spaceBetween:10,
    centeredSlides:true,
    slidesPerView:1.6
  }

  constructor(private restapiService:RestapiService, 
    private storageService:StorageService, 
    private router:Router) 
  { 
    this.GetAllProduct();
    restapiService.getAllCat().subscribe(res=>{this.cate=res;});
  }

  ngOnInit() {
    this.bannerfunction();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  GetAllProduct()
  {
    this.restapiService.getAllProducts().subscribe(res=>
      {
        this.product=res;
        for(let i =0;i<this.product.length;i++)
        {
          this.product[i].mrpprice = this.product[i].units[this.mrpvar].mrpprice;
          this.product[i].sellprice = this.product[i].units[this.mrpvar].sellprice;
          this.product[i].unit = this.product[i].units[this.mrpvar].unit_id;
        }
      });
  }

  addToCart(proId,unit)
  {
    this.restapiService.showloader();
    let data:"";
    this.storageService.getStore(this.storekey).then((res:any)=>
    {
      data = res;
      if(data)
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

  checkLogin()
  {
    this.restapiService.showloader();
    let data:'';
    this.storageService.getStore(this.storekey).then(res=>
    {
      data = res;
      if(data!=null)
      {
        this.router.navigate(['cart']);
      }else{
        let msg = 'Please Login First';
        this.restapiService.showMsg(msg);
        this.router.navigate(['login']);
      }
    });

  }

  serch_by_cat(event)
  {
    this.restapiService.showloader();
    let catId= event.target.value;
    if(catId=='')
    {
      this.GetAllProduct();
    }
    else{
    this.product = '';
    this.restapiService.serrchByCat(catId).subscribe(res=>
      {
        this.product=res;
        this.mrpvar=0;
        for(let i=0;i<this.product.length;i++)
        {
          this.product[i].mrpprice = this.product[i].units[this.mrpvar].mrpprice;
          this.product[i].sellprice = this.product[i].units[this.mrpvar].sellprice;
          this.product[i].unit = this.product[i].units[this.mrpvar].unit_id;
        }
      });
    }
  }

  ChangeQty(mrp,row)
  {
    this.product[row].mrpprice = this.product[row].units[mrp.target.value].mrpprice;
    this.product[row].sellprice = this.product[row].units[mrp.target.value].sellprice;
    this.product[row].unit = this.product[row].units[mrp.target.value].unit_id;
  }

  searchProduct()
  {
    if(this.searchItem=='')
    {
      this.GetAllProduct();
    }else{
      
    this.restapiService.SearchProduct(this.searchItem).subscribe(res=>
      {
        this.product = res;
        this.mrpvar=0;
        for(let i=0;i<this.product.length;i++)
        {
          this.product[i].mrpprice = this.product[i].units[this.mrpvar].mrpprice;
          this.product[i].sellprice = this.product[i].units[this.mrpvar].sellprice;
          this.product[i].unit = this.product[i].units[this.mrpvar].unit_id;
        }
      })

    }
  }
  bannerfunction()
  {
    this.restapiService.activebanner().subscribe(res=>
      {
        this.banner = res;
      })
  }
}





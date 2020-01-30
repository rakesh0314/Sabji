import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { RestapiService } from '../restapi.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import * as sha512 from 'js-sha512';
import { RazorpayCheckout } from 'razorpay';

// declare var RazorpayCheckout: any;

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.page.html',
  styleUrls: ['./payment-options.page.scss'],
})
export class PaymentOptionsPage implements OnInit {
  storeKey='userCart';
  total=0.00;
  price:number;
  delChargesell:number;
  totalAmountsell:number;
  delChargemrp:number;
  totalAmountmrp:number;
  mrp:number;
  totalmrp=0.00;
  saveAmount=0;
  amount="";
  product:"";
  address:"";
  userData={
    firstname:"",
    mobile:"",
    email:""
  };

  order= {
    pay_op:"",
  }
  constructor(private storageService:StorageService, private restapiService:RestapiService,
    private toastController: ToastController,
    private router:Router,
    private iab: InAppBrowser) 
  {
    storageService.getStore(this.storeKey).then(res=>
      { this.product = res;
        this.total=0.00;
        for(let i=0;i<res.length;i++)
        {
          this.price =  res[i].sellprice*res[i].quantity;
          this.mrp = res[i].mrpprice*res[i].quantity;
          this.totalmrp = +this.mrp+ +this.totalmrp;
          this.total = +this.price + +this.total;
        }
          this.delChargesell = this.total*13/100;
          this.delChargemrp = this.totalmrp*13/100;
          this.totalAmountsell = this.total+ this.delChargesell;
          this.totalAmountmrp = this.totalmrp+ this.delChargemrp;
          this.saveAmount = this.totalAmountmrp - this.totalAmountsell;
          this.amount = this.saveAmount.toFixed(2);
      });
  }

  ngOnInit() {
    this.storageService.getStore('sabjiuser').then(res=>
      {
        this.restapiService.userData(res.user_id,res.API_key).subscribe(res2=>
          {
            this.userData.firstname = res2.clt_name;
            this.userData.email = res2.clt_email;
            this.userData.mobile = res2.clt_conno;
            console.log(res2);
          })
      })
  }

  ionViewWillEnter()
  {
    this.storageService.getStore('useradd').then(res=>
      {
        if(res==null)
        {
          this.storageService.getStore('sabjiuser').then(res1=>
            {
              this.restapiService.getmyaddres(res1).subscribe(res2=>
                {
                  this.address = res2;
                })
            })
        }else{
          this.address=res;
        }
      });
      console.log(this.address);
  }

  async showmsg(msg)
  {
    const toast = await this.toastController.create(
      {
        message:msg,
        duration:1500,
        color:'dark',
        position:'middle'
      }
    );
    toast.present();
  }

  validinput()
  {
    var payment = this.order.pay_op;
    return(this.order.pay_op&&payment&&this.address!=undefined);
  }

  placeOrder()
  { 
    const key ="sabjiuser";
    if(this.validinput())
    {
      this.storageService.getStore(key).then(res=>
        {
          if(this.order.pay_op == '1')
          {
            // this.restapiService.showMsg('this service currently unavailable');
            this.placeOrders();
          }else{
            this.restapiService.makeOrder(res,this.order,this.product,this.address).subscribe(res=>
              {
                // let msg = 'Order Successfully';
                // this.showmsg(msg);
                this.router.navigate(['order-confirmation']);
              });
            }
        });
    }else{
      let msg = 'Please select payment option and address';
      this.showmsg(msg);
      // this.placeOrders();
    }
  }

  placeOrders(){ 
    var options = {
  description: 'Credits towards consultation',
  image: 'https://i.imgur.com/3g7nmJC.png',
  currency: 'INR',
  key: 'rzp_live_urHJKPlSc24yMA',
  order_id: 'order_7HtFNLS98dSj8x',
  amount: '5000',
  name: 'foo',
  prefill: {
    email: 'pranav@razorpay.com',
    contact: '8879524924',
    name: 'Pranav Gupta'
  },
  theme: {
    color: '#F37254'
  }
}

var successCallback = function(success) {
  alert('payment_id: ' + success.razorpay_payment_id)
  var orderId = success.razorpay_order_id
  var signature = success.razorpay_signature
}

var cancelCallback = function(error) {
  alert(error.description + ' (Error '+error.code+')')
}

RazorPayCheckout.on('payment.success', successCallback)
RazorPayCheckout.on('payment.cancel', cancelCallback)
RazorPayCheckout.open(options)
   
  };
}

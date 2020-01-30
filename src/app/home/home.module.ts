import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children:[
        {
         path : 'mywallet',
          children:[{

            path: '',
            loadChildren: '../mywallet/mywallet.module#MywalletPageModule'

          }]
        },

        {
         path : 'contactus',
          children:[{

            path: '',
            loadChildren: '../contactus/contactus.module#ContactusPageModule'

          }]
        },

        {
         path : 'deliveryaddress',
          children:[{

            path: '',
            loadChildren: '../deliveryaddress/deliveryaddress.module#DeliveryaddressPageModule'

          }]
        },

        {
         path : 'orderhistory',
          children:[{

            path: '',
            loadChildren: '../orderhistory/orderhistory.module#OrderhistoryPageModule'

          }]
        },

        {
         path : 'referrals',
          children:[{

            path: '',
            loadChildren: '../referrals/referrals.module#ReferralsPageModule'

          }]
        },


    ]
  },
  {
    path:'',
    redirectTo : 'home',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

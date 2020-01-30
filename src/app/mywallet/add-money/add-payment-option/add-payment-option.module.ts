import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddPaymentOptionPage } from './add-payment-option.page';

const routes: Routes = [
  {
    path: '',
    component: AddPaymentOptionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddPaymentOptionPage]
})
export class AddPaymentOptionPageModule {}

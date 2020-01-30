import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddBankaccountPage } from './add-bankaccount.page';

const routes: Routes = [
  {
    path: '',
    component: AddBankaccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddBankaccountPage]
})
export class AddBankaccountPageModule {}

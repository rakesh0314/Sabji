import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerifyotpPage } from './verifyotp.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyotpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerifyotpPage]
})
export class VerifyotpPageModule {}

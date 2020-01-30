import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'mywallet', loadChildren: './mywallet/mywallet.module#MywalletPageModule' },
  { path: 'contactus', loadChildren: './contactus/contactus.module#ContactusPageModule' },
  { path: 'orderhistory', loadChildren: './orderhistory/orderhistory.module#OrderhistoryPageModule' },
  { path: 'referrals', loadChildren: './referrals/referrals.module#ReferralsPageModule' },
  { path: 'deliveryaddress/:url', loadChildren: './deliveryaddress/deliveryaddress.module#DeliveryaddressPageModule' },
  { path: 'product/:id', loadChildren: './product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'user-account', loadChildren: './user-account/user-account.module#UserAccountPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'add-address/:type', loadChildren: './add-address/add-address.module#AddAddressPageModule' },
  { path: 'payment-options', loadChildren: './payment-options/payment-options.module#PaymentOptionsPageModule' },
  { path: 'order-confirmation', loadChildren: './order-confirmation/order-confirmation.module#OrderConfirmationPageModule' },
  { path: 'order/:id', loadChildren: './order-details/order-details.module#OrderDetailsPageModule' },
  { path: 'add-bankaccount', loadChildren: './mywallet/add-bankaccount/add-bankaccount.module#AddBankaccountPageModule' },
  { path: 'add-money', loadChildren: './mywallet/add-money/add-money.module#AddMoneyPageModule' },
  { path: 'add-payment-option', loadChildren: './mywallet/add-money/add-payment-option/add-payment-option.module#AddPaymentOptionPageModule' },
  { path: 'payment-confirmation', loadChildren: './mywallet/add-money/add-payment-option/payment-confirmation/payment-confirmation.module#PaymentConfirmationPageModule' },
  { path: 'aboutus', loadChildren: './aboutus/aboutus.module#AboutusPageModule' },
  { path: 'verifyotp/:url', loadChildren: './verifyotp/verifyotp.module#VerifyotpPageModule' },
  { path: 'reguserdetails', loadChildren: './reguserdetails/reguserdetails.module#ReguserdetailsPageModule' },
  { path: 'edit-password', loadChildren: './edit-password/edit-password.module#EditPasswordPageModule' },
  { path: 'terms', loadChildren: './terms/terms.module#TermsPageModule' },
  { path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule' },
  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

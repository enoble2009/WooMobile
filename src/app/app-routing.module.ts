import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'confirm-cart', loadChildren: './confirm-cart/confirm-cart.module#ConfirmCartPageModule' },
  { path: 'confirm-userinfo', loadChildren: './confirm-userinfo/confirm-userinfo.module#ConfirmUserinfoPageModule' },
  { path: 'final-confirmation', loadChildren: './final-confirmation/final-confirmation.module#FinalConfirmationPageModule' },
  { path: 'buy-success', loadChildren: './buy-success/buy-success.module#BuySuccessPageModule'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

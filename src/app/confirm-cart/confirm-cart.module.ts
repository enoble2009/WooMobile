import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmCartPage } from './confirm-cart.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmCartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfirmCartPage]
})
export class ConfirmCartPageModule {}

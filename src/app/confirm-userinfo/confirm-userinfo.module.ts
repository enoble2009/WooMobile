import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmUserinfoPage } from './confirm-userinfo.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmUserinfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfirmUserinfoPage]
})
export class ConfirmUserinfoPageModule {}

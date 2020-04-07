import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {OrderComponent} from './order/order.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {OrderFormComponent} from './order/order-form/order-form.component';
import {MonogramItemComponent} from './item/monogram-item/monogram-item.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'orders',
    component: OrderComponent
  },
  {
    path: 'new-order-form',
    component: OrderFormComponent
  },
  {
    path: 'monogram',
    component: MonogramItemComponent
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

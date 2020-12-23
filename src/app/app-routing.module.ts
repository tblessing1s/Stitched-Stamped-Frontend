import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StepperComponent} from './create-new-order/stepper/stepper.component';
import {MainDashboardComponent} from './main-dashboard/main-dashboard.component';
import {AppPath} from './models/app-path.enum';

const routes: Routes = [
  {
    path: AppPath.RootLink,
    component: MainDashboardComponent
  },
  {
    path: AppPath.CreateNewOrder,
    component: StepperComponent
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

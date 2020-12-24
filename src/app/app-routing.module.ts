import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StepperComponent} from './create-new-order/stepper/stepper.component';
import {MainDashboardComponent} from './main-dashboard/main-dashboard.component';
import {AppPath} from './models/app-path.enum';
import {OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';

const routes: Routes = [
  {
    path: AppPath.RootLink,
    component: MainDashboardComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: AppPath.CreateNewOrder,
    component: StepperComponent,
    canActivate: [OktaAuthGuard]
  },
  {path: AppPath.OktaLoginCallback,
    component: OktaCallbackComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StepperComponent} from './create-new-order/stepper/stepper.component';

const routes: Routes = [
  {
    path: 'create-new-order',
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

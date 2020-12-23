import {Component, OnInit, ViewChild} from '@angular/core';
import {Monogram} from '../../models/monogram';
import {FormStateService} from '../../services/form-state/form-state.service';
import {OrderItem} from '../../models/order-item';
import {Customer} from '../../models/customer';
import {Router} from '@angular/router';
import {AppPath} from '../../models/app-path.enum';
import {MatStepper} from '@angular/material';
import {SpecialOrder} from '../../models/special-order';
import {ItemComponent} from './item/item.component';
import set = Reflect.set;

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [FormStateService]
})
export class StepperComponent implements OnInit {
  monogram: Monogram;
  orderSubmitted = false;
  orderItem: OrderItem;
  customer: Customer;
  monogramList: Monogram[];
  specialOrderList: SpecialOrder[];

  constructor(
    private formStateService: FormStateService,
    private route: Router
  ) {
  }

  ngOnInit() {
    this.formStateService.getState().subscribe(state => {
      this.orderItem = state;
    });

    this.formStateService.getListOfMonogramsState().subscribe(list => {
      this.monogramList = list;
    });

    this.formStateService.getListOfSpecialOrderState().subscribe(list => {
      this.specialOrderList = list;
    });
  }

  handleGoHomeClick() {
    this.route.navigateByUrl(AppPath.RootLink);
  }

  setStepControl(step2: ItemComponent) {
    if (step2.hasSpecialOrders()) {
      return step2.specialOrderForm;
    } else if (step2.hasMonograms()) {
      return step2.monogramForm;
    }
  }
}

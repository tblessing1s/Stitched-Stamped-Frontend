import {Component, OnInit} from '@angular/core';
import {Monogram} from '../models/monogram';
import {FormStateService} from '../services/form-state/form-state.service';
import {OrderItem} from '../models/order-item';
import {Customer} from '../models/customer';

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

  constructor(private formStateService: FormStateService) {
  }

  ngOnInit() {
    this.formStateService.getState().subscribe(state => {
      this.orderItem = state;
    });

    this.formStateService.getListOfMonogramsState().subscribe(list => {
      console.log('stepper monogram list: ', this.monogramList);
      this.monogramList = list;
    });
  }

}

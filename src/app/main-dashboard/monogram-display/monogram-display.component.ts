import {Component, Input, OnInit} from '@angular/core';
import {OrderItemService} from '../../services/order-item/order-item.service';
import {Monogram} from '../../models/monogram';
import {FormGroup} from '@angular/forms';
import {SpecialOrder} from '../../models/special-order';
import {MonogramTable} from '../../models/monogram-table';

@Component({
  selector: 'app-monogram-display',
  templateUrl: './monogram-display.component.html',
  styleUrls: ['./monogram-display.component.scss'],
})
export class MonogramDisplayComponent implements OnInit {
  existingSpecialOrder = new SpecialOrder();
  doEdit = false;
  form: FormGroup;

  @Input() order = new MonogramTable();
  @Input() existingMonogram = new Monogram();
  @Input() orderType: string;

  constructor(
    private orderItemService: OrderItemService,
  ) {
  }

  ngOnInit() {
    console.log('monogramDisplay');
    this.orderItemService.getAction().subscribe(edit => {
      this.doEdit = edit;
    });
    // if (this.isOrderTypeMonogram()) {
    //   this.getMonogramByOrderId();
    // } else if (this.isOrderTypeSpecialOrder()) {
    //   this.getSpecialOrderByOrderId();
    // }
  }

  // isOrderTypeSpecialOrder() {
  //   return this.orderType === 'specialOrder';
  // }
  //
  // isOrderTypeMonogram() {
  //   return this.orderType === 'monogram';
  // }

  // getMonogramByOrderId() {
  //   this.orderItemService.getMonogramByOrderId(this.order.orderId).subscribe(monogram => {
  //     console.log('monogram', monogram);
  //     this.existingMonogram = monogram;
  //   });
  // }
  //
  // getSpecialOrderByOrderId() {
  //   this.orderItemS ervice.getSpecialOrderByOrderId(this.order.orderId).subscribe(specialOrder => {
  //     console.log('specialOrder', specialOrder);
  //     this.existingSpecialOrder = specialOrder;
  //   });
  // }
}

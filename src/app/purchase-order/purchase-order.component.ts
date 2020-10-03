import {Component, OnInit} from '@angular/core';
import {PurchaseOrderService} from '../services/purchase-order/purchase-order.service';

@Component({
  selector: 'app-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {

  constructor(private orderService: PurchaseOrderService) {
  }

  ngOnInit() {

  }
}
// Then we will need a link to the details to the purchase-order

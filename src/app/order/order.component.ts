import {Component, OnInit} from '@angular/core';
import {OrderService} from '../services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {

  }
}
// Then we will need a link to the details to the order

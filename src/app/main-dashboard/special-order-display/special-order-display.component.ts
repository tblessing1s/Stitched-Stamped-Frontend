import {Component, Input, OnInit} from '@angular/core';
import {MonogramTable} from '../../models/monogram-table';
import {Monogram} from '../../models/monogram';
import {SpecialOrderTable} from '../../models/special-order-table';
import {SpecialOrder} from '../../models/special-order';
import {OrderItemService} from '../../services/order-item/order-item.service';

@Component({
  selector: 'app-special-order-display',
  templateUrl: './special-order-display.component.html',
  styleUrls: ['./special-order-display.component.scss']
})
export class SpecialOrderDisplayComponent implements OnInit {

  @Input() order = new SpecialOrderTable();
  @Input() existingSpecialOrder = new SpecialOrder();

  doEdit = false;

  constructor(
    private orderItemService: OrderItemService
  ) { }

  ngOnInit() {
    this.orderItemService.getAction().subscribe(edit => {
      this.doEdit = edit;
    });
  }

}

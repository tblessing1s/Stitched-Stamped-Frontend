import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppPath} from '../models/app-path.enum';
import {OrderItemService} from '../services/order-item/order-item.service';
import {MonogramTable} from '../models/monogram-table';
import {Monogram} from '../models/monogram';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
})
export class MainDashboardComponent implements OnInit {
  orderClicked: any;
  orderType: string;

  existingOrderToDisplay: any;

  constructor(
    private route: Router,
    private service: OrderItemService
  ) {
  }

  ngOnInit(): void {
    this.service.getOrderDisplay().subscribe(order => {
      this.orderClicked = order.orderTable;
      this.orderType = order.orderType;
      this.setOrderDisplay();
    });
  }

  private setOrderDisplay() {
    if (this.isOrderTypeMonogram()) {
      this.service.getMonogramByOrderId(this.orderClicked.orderId).subscribe(monogram => {
          this.existingOrderToDisplay = monogram;
        }
      );
    } else if (this.isOrderTypeSpecialOrder()) {
      this.service.getSpecialOrderByOrderId(this.orderClicked.orderId).subscribe(specialOrder => {
        this.existingOrderToDisplay = specialOrder;
      });
    }
  }

  isOrderTypeSpecialOrder() {
    return this.orderType === 'specialOrder';
  }

  isOrderTypeMonogram() {
    return this.orderType === 'monogram';
  }

  handleCreateNewOrder() {
    this.route.navigateByUrl(AppPath.CreateNewOrder).then();
  }
}

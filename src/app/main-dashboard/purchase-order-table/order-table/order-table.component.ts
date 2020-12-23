import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {OrderItemService} from '../../../services/order-item/order-item.service';
import {MatTable, MatTableDataSource} from '@angular/material';
import {MonogramTable} from '../../../models/monogram-table';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;
  displayColumns = [
    'orderId',
    'itemName',
    'monogram',
    'customer',
    'menu'
  ];
  orderTable = new MonogramTable();

  monogramDataSource = new MatTableDataSource<MonogramTable>();

  @Input() expandedPurchaseOrder: number;

  constructor(
    private orderItemService: OrderItemService,
  ) { }

  ngOnInit() {
    this.orderItemService.getAllMonogramsInProgressOrdersByPurchaseOrder(this.expandedPurchaseOrder).subscribe(monogramTableData => {
      this.monogramDataSource.data = monogramTableData;
      console.log('monogramDataSource ', this.monogramDataSource.data);
    });
  }

  handleRowClick(row: any) {
    this.orderTable.orderId = row.orderId;
    this.orderTable.customer = row.customer;
    this.orderTable.status = 'In-Progress';
    // this.orderItemService.updateOrderDisplay(this.orderTable);
  }

  handleEditOrderClick() {
    this.orderItemService.updateAction(true);
  }

  // updateOrderStatus(row: any, index: number) {
  //   this.orderItemService.updateOrderToFinish(row.orderId).subscribe(() => {
  //   },
  //     () => {
  //       this.snackBar.open(`Order ${row.orderId} has failed to finish`, 'close', {duration: 3000});
  //     },
  //     () => {
  //       this.datasource.data.splice(index, 1);
  //       this.table.renderRows();
  //       this.order.emit([row.orderId, row.customer, this.orderStatus = 'Finished']);
  //       this.sendSms(row.orderId);
  //     });
  // }
  //
  // sendSms(orderId: number): void {
  //   this.customerService.getCustomerByOrderId(orderId).subscribe(customer => {
  //     this.smsMessage.to = customer.phone;
  //     this.smsMessage.message = ORDER_FINISHED_SMS;
  //   },
  //     () => {},
  //     () => {
  //     console.log('SMS Message: ', this.smsMessage);
  //     this.websocketCallback.sendSMS(this.smsMessage).subscribe(
  //       () => {},
  //       () => {this.snackBar.open('SMS was not sent!'); },
  //       () => {this.snackBar.open(`Order ${orderId} has finished successfully`, 'close', {duration: 3000}); }
  //       );
  //     });
  // }
}

import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PurchaseOrderService} from '../../services/purchase-order/purchase-order.service';
import {MatSnackBar, MatTable, MatTableDataSource} from '@angular/material';
import {PurchaseOrderTable} from '../../models/purchase-order-table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ORDER_FINISHED_SMS} from '../../constants/constants';
import {CustomerService} from '../../services/customer/customer.service';
import {WebsocketCallbackService} from '../../services/websocket-callback/websocket-callback.service';
import {SmsMessage} from '../../models/sms-message';

@Component({
  selector: 'app-purchase-order-table',
  templateUrl: './purchase-order-table.component.html',
  styleUrls: ['./purchase-order-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', overflow: 'hidden'})),
      state('expanded', style({height: '*', overflow: 'hidden'})),
      transition('expanded <=> collapsed', animate('275ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('openClose', [
      state('open', style({
        transform: 'rotate(0deg)'
      })),
      state('closed', style({
        transform: 'rotate(180deg)'
      })),
      transition('open <=> closed', animate('275ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PurchaseOrderTableComponent implements OnInit {
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;
  displayColumns = [
    'purchaseOrderId',
    'customer',
    'orderCount',
    'orderDate',
    'menu',
    'arrow'
  ];

  selectedIndex: number;
  smsMessage = new SmsMessage();
  datasource = new MatTableDataSource<PurchaseOrderTable>();
  expandedPurchaseOrder: PurchaseOrderTable | null;
  @Output() purchaseOrder = new EventEmitter<PurchaseOrderTable>();

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private websocketCallback: WebsocketCallbackService
  ) { }

  ngOnInit() {
    this.purchaseOrderService.getAllInProgressPurchaseOrders().subscribe(purchaseOrderTableDate => {
        this.datasource.data = purchaseOrderTableDate;
    });
  }

  clickInformation(i: number, row: any) {
    this.selectedIndex = i;
    this.expandedPurchaseOrder = this.expandedPurchaseOrder === row ? null : row;
  }

  updatePurchaseOrderStatus(row: any, index: number) {
    this.purchaseOrderService.updatePurchaseOrderToFinish(row.purchaseOrderId).subscribe(() => {
      },
      () => {
        this.snackBar.open(`Purchase Order ${row.purchaseOrderId} has failed to finish`, 'close', {duration: 3000});
      },
      () => {
        this.datasource.data.splice(index, 1);
        this.table.renderRows();
        this.sendSms(row.purchaseOrderId);
      });
  }

  sendSms(purchaseOrderId: number): void {
    this.customerService.getCustomerByPurchaseOrderId(purchaseOrderId).subscribe(customer => {
        this.smsMessage.to = customer.phone;
        this.smsMessage.message = ORDER_FINISHED_SMS;
  },
      () => {},
      () => {
        this.websocketCallback.sendSMS(this.smsMessage).subscribe(
          () => {},
          () => {this.snackBar.open('SMS was not sent!'); },
          () => {this.snackBar.open(`Purchase Order: ${purchaseOrderId} has finished successfully`, 'close', {duration: 3000}); }
        );
      });
  }
}

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MonogramTable} from '../../../models/monogram-table';
import {MatTable, MatTableDataSource} from '@angular/material';
import {OrderItemService} from '../../../services/order-item/order-item.service';

@Component({
  selector: 'app-monogram-table',
  templateUrl: './monogram-table.component.html',
  styleUrls: ['./monogram-table.component.scss']
})
export class MonogramTableComponent implements OnInit {
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;
  displayColumns = [
    'orderId',
    'itemName',
    'monogram',
    'customer',
    'menu'
  ];
  monogramTable = new MonogramTable();

  datasource = new MatTableDataSource<MonogramTable>();

  @Input() expandedPurchaseOrder: number;
  @Input() listMonogramTable: MonogramTable[];

  constructor(
    private orderItemService: OrderItemService
  ) {
  }

  ngOnInit() {
    this.orderItemService.getAllMonogramsInProgressOrdersByPurchaseOrder(this.expandedPurchaseOrder).subscribe(monogramTableData => {
        this.datasource.data = monogramTableData;
      },
      () => {
      },
      () => {
        if (this.table) {
          this.table.renderRows();
        }
      });
  }

  handleRowClick(row: any) {
    this.monogramTable.orderId = row.orderId;
    this.monogramTable.customer = row.customer;
    this.monogramTable.status = 'In-Progress';
    console.log('handle monogram row click', this.monogramTable);
    this.orderItemService.updateOrderDisplay('monogram', this.monogramTable);
  }

  handleEditOrderClick() {
    this.orderItemService.updateAction(true);
  }
}

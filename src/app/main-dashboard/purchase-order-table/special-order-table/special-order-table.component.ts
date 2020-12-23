import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material';
import {MonogramTable} from '../../../models/monogram-table';
import {SpecialOrderTable} from '../../../models/special-order-table';
import {OrderItemService} from '../../../services/order-item/order-item.service';

@Component({
  selector: 'app-special-order-table',
  templateUrl: './special-order-table.component.html',
  styleUrls: ['./special-order-table.component.scss']
})
export class SpecialOrderTableComponent implements OnInit {
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;
  displayColumns = [
    'orderId',
    'itemName',
    'brand',
    'size',
    'itemColor',
    'menu'
  ];
  specialOrderTable = new SpecialOrderTable();

  datasource = new MatTableDataSource<SpecialOrderTable>();

  @Input() expandedPurchaseOrder: number;
  @Input() monogramTable: SpecialOrderTable[];

  constructor(
    private orderItemService: OrderItemService
  ) { }

  ngOnInit() {
    this.orderItemService.getAllSpecialOrdersInProgressOrdersByPurchaseOrder(this.expandedPurchaseOrder).subscribe(specialOrderTableData => {
        this.datasource.data = specialOrderTableData;
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
    this.specialOrderTable.orderId = row.orderId;
    this.specialOrderTable.itemName = row.itemName;
    this.specialOrderTable.brand = row.brand;
    this.specialOrderTable.size = row.size;
    this.specialOrderTable.itemColor = row.itemColor;
    this.specialOrderTable.customer = row.customer;
    this.orderItemService.updateOrderDisplay('specialOrder', this.specialOrderTable);
  }

  handleEditOrderClick() {
    this.orderItemService.updateAction(true);
  }
}

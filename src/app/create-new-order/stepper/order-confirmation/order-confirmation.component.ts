import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Monogram} from '../../../models/monogram';
import {Customer} from '../../../models/customer';
import {CustomerService} from '../../../services/customer/customer.service';
import {OrderItem} from '../../../models/order-item';
import {OrderItemService} from '../../../services/order-item/order-item.service';
import {MonogramService} from '../../../services/item/monogram.service';
import {FormStateService} from '../../../services/form-state/form-state.service';
import {PurchaseOrder} from '../../../models/purchase-order';
import {MatTable, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PurchaseOrderService} from '../../../services/purchase-order/purchase-order.service';

export interface Tile {
  field: string;
  property?: string;
  cols: number;
  rows: number;
  border?: string;
}

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;
  form: FormGroup;
  orderItem = new OrderItem();
  purchaseOrder: PurchaseOrder;
  monogram: Monogram;
  isOrderSubmitted = false;
  @Output() orderSubmitted = new EventEmitter<boolean>();
  tiles: Tile[];
  placement: string;
  customer: Customer;
  monogramList: Monogram[] = [];
  dataSource = new MatTableDataSource<Monogram>();
  listOfMonograms: any[];

  displayColumns = [
    'itemName',
    'monogram',
    'font',
    'threadColor',
    'placement',
    'designNotes'];

  constructor(private customerService: CustomerService,
              private monogramService: MonogramService,
              private purchaseOrderService: PurchaseOrderService,
              private orderItemService: OrderItemService,
              private formStateService: FormStateService,
              private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      signature: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.formStateService.getState().subscribe(state => {
      this.purchaseOrder = state.purchaseOrder._links.purchaseOrder.href;
      this.customerService.getCustomer(state.purchaseOrder._links.customer.href).subscribe(customer => {
        this.customer = customer;
      });
    });

    this.formStateService.getListOfMonogramsState().subscribe(listOfMonogram => {
      this.listOfMonograms = listOfMonogram;
      console.log('monograms', this.listOfMonograms);
      this.dataSource.data = this.listOfMonograms;
    });

  }

  get signature() {
    return this.form.get('signature');
  }

  submit() {
    console.log('submit datasource: ', this.listOfMonograms);
    for (const monogram of this.listOfMonograms) {
      this.orderItem.purchaseOrder = this.purchaseOrder;
      this.orderItem.monogram = monogram._links.monogram.href;
      this.orderItem.signature = this.form.get('signature').value;
      console.log('orderItem', this.orderItem);
      this.orderItemService.createOrderItem(this.orderItem).subscribe(result => {
        this.orderItem = result;
        this.orderSubmitted.emit(this.isOrderSubmitted = true);
        this.signature.disable();
      });
    }
  }
}

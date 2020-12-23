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
import {SpecialOrder} from '../../../models/special-order';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DISPLAY_MONOGRAM_COLUMNS, DISPLAY_SPECIAL_ORDER_COLUMNS, LOGO_IMAGE} from '../../../constants/constants';
import {GeneratePdfService} from '../../../services/generate-pdf/generate-pdf.service';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  orderItem = new OrderItem();
  purchaseOrderHref: PurchaseOrder;
  monogram: Monogram;
  isOrderSubmitted = false;
  @Output() orderSubmitted = new EventEmitter<boolean>();
  placement: string;
  customer: Customer;
  monogramDataSource = new MatTableDataSource<Monogram>();
  specialOrderDataSource = new MatTableDataSource<SpecialOrder>();
  listOfMonograms: any[];
  listOfSpecialOrders: any[];
  purchaseOrder: any;
  displayMonogramColumns = DISPLAY_MONOGRAM_COLUMNS;
  displaySpecialOrderColumns = DISPLAY_SPECIAL_ORDER_COLUMNS;

  constructor(private customerService: CustomerService,
              private monogramService: MonogramService,
              private purchaseOrderService: PurchaseOrderService,
              private orderItemService: OrderItemService,
              private formStateService: FormStateService,
              private formBuilder: FormBuilder,
              private generatePdfService: GeneratePdfService
  ) {
  }

  ngOnInit() {
    this.formStateService.getState().subscribe(state => {
      this.purchaseOrder = state.purchaseOrder;
      this.purchaseOrderHref = state.purchaseOrder._links.purchaseOrder.href;
      this.customerService.getCustomer(state.purchaseOrder._links.customer.href).subscribe(customer => {
        this.customer = customer;
      });
    });

    this.formStateService.getListOfMonogramsState().subscribe(listOfMonogram => {
      this.listOfMonograms = listOfMonogram;
      this.monogramDataSource.data = this.listOfMonograms;
    });

    this.formStateService.getListOfSpecialOrderState().subscribe(listOfSpecialOrder => {
      this.listOfSpecialOrders = listOfSpecialOrder;
      this.specialOrderDataSource.data = this.listOfSpecialOrders;
    });

  }

  submit() {
    if (this.listOfMonograms.length > 0) {
      this.saveMonograms();
    }
    if (this.listOfSpecialOrders.length > 0) {
      this.saveSpecialOrders();
    }
  }

  private saveMonograms() {
    for (const monogram of this.listOfMonograms) {
      this.orderItem.purchaseOrder = this.purchaseOrderHref;
      this.orderItem.monogram = monogram._links.monogram.href;
      this.orderItem.status = 'In-Progress';
      this.orderItemService.createOrderItem(this.orderItem).subscribe(result => {
        this.orderItem = result;
        this.orderSubmitted.emit(this.isOrderSubmitted = true);
      });
    }
  }

  private saveSpecialOrders() {
    for (const specialOrders of this.listOfSpecialOrders) {
      this.orderItem.purchaseOrder = this.purchaseOrderHref;
      this.orderItem.monogram = null;
      this.orderItem.specialOrder = specialOrders._links.specialOrder.href;
      this.orderItem.status = 'In-Progress';
      this.orderItemService.createOrderItem(this.orderItem).subscribe(result => {
        this.orderItem = result;
        this.orderSubmitted.emit(this.isOrderSubmitted = true);
      });
    }
  }

  createPDF() {
    this.generatePdfService.createPDF(this.customer, this.purchaseOrder, this.monogramDataSource.data, this.specialOrderDataSource.data);
  }
}

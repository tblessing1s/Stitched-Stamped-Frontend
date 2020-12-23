import {Component, Input, OnInit} from '@angular/core';
import {PurchaseOrder} from '../../../models/purchase-order';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {PurchaseOrderService} from '../../../services/purchase-order/purchase-order.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Customer} from '../../../models/customer';
import {CustomerService} from '../../../services/customer/customer.service';
import {map, startWith} from 'rxjs/operators';
import {CustomerComponent} from '../../../customer/customer.component';
import {FormStateService} from '../../../services/form-state/form-state.service';
import {OrderItemProperties} from '../../../models/order-item-properties.enum';
import {ErrorStateMatcher} from '@angular/material/core';
import {MyErrorStateMatcher} from '../../../shared/error-state-matcher/MyErrorStateMatcher';

export function RequireMatch(control: AbstractControl) {
  const selection: any = control.value;
  if (typeof selection === 'string') {
    return {incorrect: true};
  }
  return null;
}

@Component({
  selector: 'app-purchase-order-form',
  templateUrl: './purchase-order-form.component.html',
  styleUrls: ['./purchase-order-form.component.scss']
})
export class PurchaseOrderFormComponent implements OnInit {
  filteredOptions: Observable<any[]>;
  searchForm: FormGroup;
  customer: Customer;
  purchaseOrder = new PurchaseOrder();
  isNewCustomer = false;
  customers: Customer[];
  matcher = new MyErrorStateMatcher();
  isCustomersEmpty = false;
  @Input() orderSubmitted: boolean;

  constructor(private orderService: PurchaseOrderService,
              private customerService: CustomerService,
              private route: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private formStateService: FormStateService
  ) {
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.required, RequireMatch])
    });

  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(result => {
      this.customers = result;
    });

    this.filteredOptions = this.search.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : this.setCustomer(value)),
        map(name => name ? this._filter(name) : [])
      );
  }

  get search() {
    return this.searchForm.get('search');
  }

  createOrder() {
    this.purchaseOrder.status = 'In-Progress';
    this.orderService.createNewOrder(this.purchaseOrder).subscribe((result) => {
        this.formStateService.update(result, OrderItemProperties.PURCHASEORDER);
        this.purchaseOrder.id = result.id;
      }
    );

  }

  openDialog() {
    const dialogRef = this.dialog.open(CustomerComponent, {
      width: '375px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.customer = result;
      this.ngOnInit();
    });
  }

  displayFn(customer: Customer): string {
    return customer ? `${customer.lastName}, ${customer.firstName} | ${customer.phone}` : '';
  }

  private setCustomer(customer: any) {
    this.purchaseOrder.customer = customer._links.customer.href;
    return customer.name;
  }

  private _filter(name: string): Customer[] {
    const filter = this.customers.filter(customer => this._searchOn(customer, name));
    this.isCustomersEmpty = filter.length < 1;
    return filter;
  }

  private _searchOn(customer: Customer, nameLowerCase: string) {
    return customer.phone.indexOf(nameLowerCase) === 0 ||
      (customer.firstName.toLowerCase() + ' ' + customer.lastName.toLowerCase()).indexOf(nameLowerCase.toLowerCase()) === 0 ||
      (customer.lastName.toLowerCase() + ' ' + customer.firstName.toLowerCase()).indexOf(nameLowerCase.toLowerCase()) === 0;
  }
}

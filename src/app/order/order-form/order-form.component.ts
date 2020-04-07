import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../models/order';
import {FormControl, FormGroup} from '@angular/forms';
import {OrderService} from '../../services/order/order.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Customer} from '../../models/customer';
import {CustomerService} from '../../services/customer/customer.service';
import {map, startWith} from 'rxjs/operators';
import {MonogramItemComponent} from '../../item/monogram-item/monogram-item.component';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  createdOrder: Order;
  filteredOptions: Observable<Customer[]>;
  search = new FormControl();
  customer: Customer;
  order = new Order();
  orderExist = false;
  isNewCustomer = false;
  customers: Customer[];
  orders: Order[];

  constructor(private orderService: OrderService,
              private customerService: CustomerService,
              private route: Router,
              private dialogRef: MatDialogRef<OrderFormComponent>,
              private snackBar: MatSnackBar
  ) {
    this.customerService.getCustomers().subscribe(result => this.customers = result);

  }

ngOnInit() {
    this.filteredOptions = this.search.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : this.setCustomer(value)),
        map(name => name ? this._filter(name) : [])
      );
  }

  createOrder() {
    this.orderService.createNewOrder(this.order).subscribe((result) => {
       this.order = result;
       console.log('subscribe: ', this.order);
       this.orderExist = true;
       this.route.navigate(['/monogram']);
      },
      () => this.snackBar.open('Order did not save', 'Close'),
      () => this.snackBar.open('Order did save', 'Close')
      );
    this.dialogRef.close();

  }


  displayFn(customer: Customer): string {
    console.log('displayFn', customer);
    return customer ? `${customer.LastName}, ${customer.FirstName} | ${customer.Phone}` : '';
  }

  private setCustomer(customer: any) {
    this.order.customer = customer;
    return  customer.name;
  }

  private _filter(name: string): Customer[] {

    return this.customers.filter(customer => this._searchOn(customer, name));
  }

  private _searchOn(customer: Customer, nameLowerCase: string) {
    console.log(nameLowerCase);
    return customer.Phone.indexOf(nameLowerCase) === 0 ||
      (customer.FirstName.toLowerCase() + ' ' + customer.LastName.toLowerCase()).indexOf(nameLowerCase.toLowerCase()) === 0 ||
      (customer.LastName.toLowerCase() + ' ' + customer.FirstName.toLowerCase()).indexOf(nameLowerCase.toLowerCase()) === 0;
  }
}

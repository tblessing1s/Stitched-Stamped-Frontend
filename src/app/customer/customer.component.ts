import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Customer} from '../models/customer';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {CustomerService} from '../services/customer/customer.service';
import {Router} from '@angular/router';
import {Validation} from '../shared/validators/validation';
import {ErrorStateMatcher} from '@angular/material/core';
import {OrderFormComponent} from '../order/order-form/order-form.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  @Output() isNewCustomer = new EventEmitter<boolean>();
  customer = new Customer();
  form: FormGroup;
  validation = new Validation();
  matcher = new MyErrorStateMatcher();
  customers: Customer[];

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private route: Router,
    private dialogRef: MatDialogRef<CustomerComponent>,
    private orderFormComponent: OrderFormComponent
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.validation.phoneValidation)
      ])
    });

  }

  save(): void {
    this.customer.FirstName = this.form.get('firstName').value;
    this.customer.LastName = this.form.get('lastName').value;
    this.customer.Email = this.form.get('email').value;
    this.customer.Phone = this.form.get('phone').value;
    this.customerService.createNewCustomer(this.customer).subscribe(
      result => {
        this.customer = result;
      },
      () => this.snackBar.open(`Customer was not saved`, 'Close'),
      () => this.snackBar.open(`Customer was saved`, 'Close')
    );
    this.dialogRef.close();

  }

}

import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Customer} from '../models/customer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {CustomerService} from '../services/customer/customer.service';
import {Router} from '@angular/router';
import {Validation} from '../shared/validators/validation';
import {MyErrorStateMatcher} from '../shared/error-state-matcher/MyErrorStateMatcher';

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
    private dialogRef: MatDialogRef<CustomerComponent>
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.validation.phoneValidation)
      ])
    });
  }

  save(): void {
    this.customer.firstName = this.form.get('firstName').value;
    this.customer.lastName = this.form.get('lastName').value;
    this.customer.email = this.form.get('email').value;
    this.customer.phone = this.form.get('phone').value;
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

import { Component, OnInit } from '@angular/core';
import {Customer} from '../../models/customer';
import {FormControl, FormGroup} from '@angular/forms';
import {CustomerService} from '../../services/customer/customer.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.scss']
})
export class CreateOrderDialogComponent implements OnInit {
constructor(  ) {
}

  ngOnInit(): void {
  }

}

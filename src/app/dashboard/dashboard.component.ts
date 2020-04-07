import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Customer} from '../models/customer';
import {CreateOrderDialogComponent} from '../shared/create-order-dialog/create-order-dialog.component';
import {CustomerComponent} from '../customer/customer.component';
import {CustomerService} from '../services/customer/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }


}

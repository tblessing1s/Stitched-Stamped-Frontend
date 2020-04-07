import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Customer} from './models/customer';
import {OrderFormComponent} from './order/order-form/order-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Stitched & Stamped';
  customer = new Customer();

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      width: '375px'
    });
    console.log('dialogRef', dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      this.customer = result;
      this.ngOnInit();
    });
  }
}

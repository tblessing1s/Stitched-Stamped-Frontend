import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ItemComponent, OrderType} from '../item.component';

@Component({
  selector: 'app-select-item-dialog',
  templateUrl: './select-item-dialog.component.html',
  styleUrls: ['./select-item-dialog.component.scss']
})
export class SelectItemDialogComponent implements OnInit {
  itemType: string;

  constructor(public dialogRef: MatDialogRef<ItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OrderType) { }

  ngOnInit() {
  }

  orderTypeHandleClick(monogram: string) {
    this.dialogRef.close({data: monogram});
  }
}

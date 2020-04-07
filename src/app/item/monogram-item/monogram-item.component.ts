import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../models/order';
import {Monogram} from '../../models/monogram';
import {ItemService} from '../../services/item/item.service';
import {OrderService} from '../../services/order/order.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-monogram-item',
  templateUrl: './monogram-item.component.html',
  styleUrls: ['./monogram-item.component.scss']
})
export class MonogramItemComponent implements OnInit {
  @Input() order: Order;
  monogram = new Monogram();
  form: FormGroup;
  fontList = [
    'Interlocking', 'Grand', 'Curlz Circle', 'Natural Circle',
    'Savannah', 'Fishtail', 'Clubhouse', 'Fancy Oval', 'Caroline',
    'Honeycomb', 'Master Circle', 'Scroll', 'Other'
  ];

  placementOptions = [
    'Left Chest', 'Center', 'Hemline', 'Other'
  ];
  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.form = new FormGroup({
      itemName: new FormControl(),
      font: new FormControl(),
      threadColor: new FormControl(),
      placement: new FormControl(),
      monogram: new FormControl(),
      designNotes: new FormControl(),
    });


    console.log('After Subscribe ', this.order);


  }

  save() {
    this.monogram.Order = this.order;
    this.monogram.Monogram = this.form.get('monogram').value;
    this.monogram.Placement = this.form.get('placement').value;
    this.monogram.ThreadColor = this.form.get('threadColor').value;
    this.monogram.ItemName = this.form.get('itemName').value;
    this.monogram.Order = this.order;

    console.log('save: ', this.monogram);

    this.itemService.createNewMonogram(this.monogram).subscribe();
  }
}

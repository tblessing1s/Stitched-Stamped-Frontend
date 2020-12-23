import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Monogram} from '../../../models/monogram';
import {SpecialOrder} from '../../../models/special-order';
import {MonogramService} from '../../../services/item/monogram.service';
import {OrderItemService} from '../../../services/order-item/order-item.service';

@Component({
  selector: 'app-edit-special-order',
  templateUrl: './edit-special-order.component.html',
  styleUrls: ['./edit-special-order.component.scss']
})
export class EditSpecialOrderComponent implements OnInit {
  @Input() existingSpecialOrder: SpecialOrder;
  @Output() doEdit = new EventEmitter<boolean>();
  form: FormGroup;
  editingSpecialOrder: SpecialOrder;

  constructor(
    private monogramService: MonogramService,
    private formBuilder: FormBuilder,
    private orderItemService: OrderItemService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      itemName: [''],
      brand: [''],
      size: [''],
      itemColor: [''],
      designNotes: [''],
    });
  }

  updateSpecialOrder() {
    this.editingSpecialOrder = this.existingSpecialOrder;
    this.editingSpecialOrder.itemName = this.itemName.value === '' ? this.existingSpecialOrder.itemName : this.itemName.value;
    this.editingSpecialOrder.brand = this.brand.value === '' ? this.existingSpecialOrder.brand : this.brand.value;
    this.editingSpecialOrder.size = this.size.value === '' ? this.existingSpecialOrder.size : this.size.value;
    this.editingSpecialOrder.itemColor = this.itemColor.value === '' ? this.existingSpecialOrder.itemColor : this.itemColor.value;
    this.editingSpecialOrder.designNotes = this.designNotes.value === '' ? this.existingSpecialOrder.designNotes : this.designNotes.value;
    this.monogramService.createNewSpecialOrder(this.editingSpecialOrder).subscribe(editedSpecialOrder => {
      this.existingSpecialOrder = editedSpecialOrder;
      this.doEdit.emit(false);
    });
  }

  cancelEdit() {
    this.doEdit.emit(false);
    this.orderItemService.updateAction(false);
  }

  get itemName() {
    return this.form.get('itemName');
  }
  get brand() {
    return this.form.get('brand');
  }
  get size() {
    return this.form.get('size');
  }
  get itemColor() {
    return this.form.get('itemColor');
  }
  get designNotes() {
    return this.form.get('designNotes');
  }
}

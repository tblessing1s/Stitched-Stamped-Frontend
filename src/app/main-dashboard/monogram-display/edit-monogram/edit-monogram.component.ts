import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Monogram} from '../../../models/monogram';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MonogramService} from '../../../services/item/monogram.service';
import {OrderItemService} from '../../../services/order-item/order-item.service';

@Component({
  selector: 'app-edit-monogram',
  templateUrl: './edit-monogram.component.html',
  styleUrls: ['./edit-monogram.component.scss']
})
export class EditMonogramComponent implements OnInit {
  @Input() existingMonogram: Monogram;
  @Output() doEdit = new EventEmitter<boolean>();
  form: FormGroup;
  editingMonogram: Monogram;

  constructor(
    private monogramService: MonogramService,
    private formBuilder: FormBuilder,
    private orderItemService: OrderItemService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      itemName: [''],
      font: [''],
      threadColor: [''],
      placement: [''],
      monogram: [''],
      designNotes: [''],
    });
  }

  updateMonogram() {
    this.editingMonogram = this.existingMonogram;
    this.editingMonogram.itemName = this.itemName.value === '' ? this.existingMonogram.itemName : this.itemName.value;
    this.editingMonogram.threadColor = this.threadColor.value === '' ? this.existingMonogram.threadColor : this.threadColor.value;
    this.editingMonogram.monogram = this.monogram.value === '' ? this.existingMonogram.monogram : this.monogram.value;
    this.editingMonogram.font = this.setField('font', 'otherFont');
    this.editingMonogram.placement = this.setField('placement', 'otherPlacement');
    this.editingMonogram.designNotes = this.designNotes.value === '' ? this.existingMonogram.designNotes : this.designNotes.value;
    this.monogramService.createNewMonogram(this.editingMonogram).subscribe( editedMonogram => {
        this.existingMonogram = editedMonogram;
        this.doEdit.emit(false);
      }
    );
  }

  get itemName() {
    return this.form.get('itemName');
  }

  get font() {
    return this.form.get('font');
  }

  get threadColor() {
    return this.form.get('threadColor');
  }

  get placement() {
    return this.form.get('placement');
  }

  get monogram() {
    return this.form.get('monogram');
  }

  get designNotes() {
    return this.form.get('designNotes');
  }

  cancelEdit() {
    this.doEdit.emit(false);
    this.orderItemService.updateAction(false);
  }

  private setField(field: string, otherField: string) {
    if (this.existingMonogram[field] === 'Other') {
      return this[field].value === '' ? this.existingMonogram[otherField] : this[field].value;
    } else {
      return this[field].value === '' ? this.existingMonogram[field] : this[field].value;
    }
  }

}

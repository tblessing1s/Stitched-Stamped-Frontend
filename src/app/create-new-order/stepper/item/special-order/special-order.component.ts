import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MonogramService} from '../../../../services/item/monogram.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormStateService} from '../../../../services/form-state/form-state.service';
import {MatDialog} from '@angular/material';
import {MyErrorStateMatcher} from '../../../../shared/error-state-matcher/MyErrorStateMatcher';
import {WarningDialogComponent} from '../../../../shared/warning-dialog/warning-dialog.component';
import {SpecialOrder} from '../../../../models/special-order';
import {OrderItemProperties} from '../../../../models/order-item-properties.enum';

@Component({
  selector: 'app-special-order',
  templateUrl: './special-order.component.html',
  styleUrls: ['./special-order.component.scss']
})
export class SpecialOrderComponent implements OnInit {
  specialOrderToSave = new SpecialOrder();
  specialOrderForm: FormGroup;
  errorMatcher = new MyErrorStateMatcher();
  confirmDelete: boolean;

  @Input() monogramIndex: number;
  @Output() formIndexToRemove = new EventEmitter<number>();
  @Output() isMonogramCreated = new EventEmitter<boolean>();
  @Input() orderSubmitted: boolean;
  @Input() existingForm: any;
  saved: false;

  constructor(private monogramService: MonogramService,
              private formStateService: FormStateService,
              private formBuilder: FormBuilder,
              private matDialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.specialOrderForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      brand: ['', Validators.required],
      size: ['', Validators.required],
      itemColor: ['', Validators.required],
      designNotes: [''],
    });
  }

  get itemName() {
    return this.specialOrderForm.get('itemName');
  }

  get brand() {
    return this.specialOrderForm.get('brand');
  }

  get size() {
    return this.specialOrderForm.get('size');
  }

  get itemColor() {
    return this.specialOrderForm.get('itemColor');
  }

  get designNotes() {
    return this.specialOrderForm.get('designNotes');
  }

  save() {
    this.specialOrderToSave.itemName = this.specialOrderForm.get('itemName').value;
    this.specialOrderToSave.brand = this.specialOrderForm.get('brand').value;
    this.specialOrderToSave.size = this.specialOrderForm.get('size').value;
    this.specialOrderToSave.itemColor = this.specialOrderForm.get('itemColor').value;
    this.specialOrderToSave.designNotes = this.specialOrderForm.get('designNotes').value;

    this.monogramService.createNewSpecialOrder(this.specialOrderToSave).subscribe(result => {
      this.formStateService.update(result, OrderItemProperties.SPECIALORDER);
      this.specialOrderToSave = result;
      this.formStateService.updateSpecialOrder(this.specialOrderToSave);
    });
    this.isMonogramCreated.emit(false);
    this.saved = false;
  }

  deleteSpecialOrder(specialOrder: SpecialOrder, index: number, $event: MouseEvent) {
    this.saved = false;
    $event.stopPropagation();
    if (specialOrder.id) {
      const dialogRef = this.matDialog.open(WarningDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
          this.confirmDelete = result;
          if (this.confirmDelete) {
            this.monogramService.deleteSpecialOrder(specialOrder);
            this.formStateService.removeSpecialOrder(specialOrder);
          }
        },
        () => {
        },
        () => {
          if (this.confirmDelete) {
            this.formIndexToRemove.emit(index);
            this.isMonogramCreated.emit(false);
          }
        });
    } else {
      this.formIndexToRemove.emit(index);
      this.isMonogramCreated.emit(false);
    }
  }
}

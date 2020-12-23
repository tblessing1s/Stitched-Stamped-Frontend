import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MonogramService} from '../../../services/item/monogram.service';
import {FormStateService} from '../../../services/form-state/form-state.service';
import {MatDialog} from '@angular/material';
import {SelectItemDialogComponent} from './select-item-dialog/select-item-dialog.component';

export interface OrderType {
  orderType: string;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit, AfterViewInit {
  monogramForm: FormGroup;
  specialOrderForm: FormGroup;
  forms: FormArray;
  overallForm: FormGroup;
  @Input() orderSubmitted: boolean;
  isNewItem: boolean;

  orderType = '';

  constructor(
    private formBuilder: FormBuilder,
    private monogramService: MonogramService,
    private formStateService: FormStateService,
    private dialog: MatDialog,
    private changeDetection: ChangeDetectorRef
  ) {
    if (!this.monogramForm) {
      this.monogramForm = this.formBuilder.group({});
      this.monogramForm.setErrors({invalid: true});
    }

    if (!this.specialOrderForm) {
      this.specialOrderForm = this.formBuilder.group({});
      this.specialOrderForm.setErrors({invalid: true});
    }

    this.overallForm = this.formBuilder.group({
      monogramArrayForm: this.formBuilder.array([]),
      specialOrderForms: this.formBuilder.array([])
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.changeDetection.detectChanges();
  }

  get monogramArrayForm() {
    return this.overallForm.get('monogramArrayForm')['controls'];
  }

  get specialOrderForms() {
    return this.overallForm.get('specialOrderForms')['controls'];
  }

  addForm(type: string) {
    this.orderType = type;
    if (type === 'monogram') {
      this.monogramArrayForm.push(this.monogramForm);
      this.isNewItem = true;
      this.overallForm.get('monogramArrayForm').updateValueAndValidity();
    } else if (type === 'specialOrder') {
      this.specialOrderForms.push(this.specialOrderForm);
      this.isNewItem = true;
      this.overallForm.get('specialOrderForms').updateValueAndValidity();
    }
  }

  removeForm(formIndexToRemove, formType: string) {
    if (formType === 'monogram') {
      this.monogramArrayForm.splice(formIndexToRemove, 1);
      if (this.monogramArrayForm.length === 0) {
        this.monogramForm.setErrors({invalid: true});
      }
    } else if (formType === 'specialOrder') {
      this.specialOrderForms.splice(formIndexToRemove, 1);
      if (this.specialOrderForms.length === 0) {
        this.specialOrderForm.setErrors({invalid: true});
      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(SelectItemDialogComponent, {
      width: '400px',
      data: {orderType: this.orderType}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.orderType = result.data;
      this.addForm(this.orderType);
    });
  }

  hasSpecialOrders(): boolean {
    return this.specialOrderForms.length > 0;
  }

  hasMonograms(): boolean {
    return this.monogramArrayForm.length > 0;
  }

  isReviewButtonDisabled(): boolean {
    return (
        (this.specialOrderForms.length === 0)
        && (this.monogramArrayForm.length === 0)
      )
      || this.isNewItem;
  }
}

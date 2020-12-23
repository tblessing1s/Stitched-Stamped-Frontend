import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Monogram} from '../../../../models/monogram';
import {MonogramService} from '../../../../services/item/monogram.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {FormStateService} from '../../../../services/form-state/form-state.service';
import {OrderItemProperties} from '../../../../models/order-item-properties.enum';
import {FontList} from '../../../../models/font-list.enum';
import {PlacementOptions} from '../../../../models/placement-options.enum';
import {ErrorStateMatcher, MatDialog} from '@angular/material';
import {MonogramOptions} from '../../../../models/monogram-options.enum';
import {MonogramProperties} from '../../../../models/monogram-properties.enum';
import {MyErrorStateMatcher} from '../../../../shared/error-state-matcher/MyErrorStateMatcher';
import {WarningDialogComponent} from '../../../../shared/warning-dialog/warning-dialog.component';

export class InvalidOtherOptionValidatorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.touched && (form.hasError('invalidOtherOption'));
  }
}

export const otherOptionValidator: ValidatorFn = (fg: FormGroup) => {
  const otherOption = fg.get('placement').value;
  const otherPlacement = fg.get('otherPlacement').value;
  const isOtherPlacement = otherOption !== PlacementOptions.OTHER || otherPlacement;
  return isOtherPlacement ? null : {invalidOtherOption: true};
};

export class InvalidFontOtherOptionValidatorMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.touched && (form.hasError('invalidOtherFontOption'));
  }
}

export const otherFontOptionValidator: ValidatorFn = (fg: FormGroup) => {
  const otherOption = fg.get('font').value;
  const otherFont = fg.get('otherFont').value;
  const isOtherFont = otherOption !== FontList.OTHER || otherFont;
  return isOtherFont ? null : {invalidOtherFontOption: true};
};

export class InvalidMonogramOtherOptionValidatorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.touched && (form.hasError('invalidOtherMonogramOption'));
  }
}

export const otherMonogramOptionValidator: ValidatorFn = (fg: FormGroup) => {
  const otherOption = fg.get('monogram').value;
  return otherOption ? null : {invalidOtherMonogramOption: true};
};


@Component({
  selector: 'app-monogram-item',
  templateUrl: './monogram-item.component.html',
  styleUrls: ['./monogram-item.component.scss']
})
export class MonogramItemComponent implements OnInit {
  monogramToSave = new Monogram();
  form: FormGroup;
  otherOptionMatcher = new InvalidOtherOptionValidatorMatcher();
  otherFontOptionMatcher = new InvalidFontOtherOptionValidatorMatcher();
  otherMonogramOptionMatcher = new InvalidMonogramOtherOptionValidatorMatcher();
  errorMatcher = new MyErrorStateMatcher();
  invalidOtherOption: boolean;
  invalidOtherFontOption: boolean;
  invalidOtherMonogramOption: boolean;
  placementOptions = Object.values(PlacementOptions);
  fontList = Object.values(FontList);
  monogramOptions = Object.values(MonogramOptions);
  monogramValue = '';
  initials = new Map<string, string>();
  monogramType = MonogramOptions;
  fontOption = FontList;
  placementType = PlacementOptions;
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
    this.form = this.formBuilder.group({
      itemName: ['', Validators.required],
      font: ['', Validators.required],
      threadColor: ['', Validators.required],
      placement: ['', Validators.required],
      monogramOption: ['', Validators.required],
      monogram: ['', Validators.required],
      designNotes: [''],
      otherPlacement: [''],
      otherFont: [''],
    }, {validators: [otherOptionValidator, otherFontOptionValidator, otherMonogramOptionValidator]});
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((changes) => {
      this.invalidOtherOption = this.form.hasError('invalidOtherOption');
      this.invalidOtherFontOption = this.form.hasError('invalidOtherFontOption');
      this.invalidOtherMonogramOption = this.form.hasError('invalidOtherMonogramOption');
      if (changes.monogramOption !== MonogramOptions.THREELETTER) {
        this.initials.clear();
        this.monogramValue = undefined;
      }
    });
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

  get monogramOption() {
    return this.form.get('monogramOption');
  }

  get monogram() {
    return this.form.get('monogram');
  }

  get designNotes() {
    return this.form.get('designNotes');
  }

  get otherPlacement() {
    return this.form.get('otherPlacement');
  }

  get otherFont() {
    return this.form.get('otherFont');
  }

  displayInitials(initials: string[]) {
    const keys = ['First', ' Last ', ' Middle'];
    if (this.monogramOption.value === MonogramOptions.THREELETTER) {
      if (initials[0]) {
        this.initials.set(keys[0], initials[0]);
      } else {
        this.initials.delete(keys[0]);
      }

      if (initials[1]) {
        this.initials.set(keys[1], initials[1]);
      } else {
        this.initials.delete(keys[1]);
      }

      if (initials[2]) {
        this.initials.set(keys[2], initials[2]);
      } else {
        this.initials.delete(keys[2]);
      }
      this.monogramValue = initials.join('');
      return this.initials.entries();
    }
    this.monogramValue = '';
    return this.initials.set(null, null);
  }

  asIsOrder() {
    return 1;
  }


  displayWidth(form: AbstractControl, option: string, smallerWidth: number, largerWidth: number) {
    if (form.value === option) {
      return smallerWidth;
    }
    return largerWidth;
  }

  save() {
    this.monogramToSave.monogram = this.form.get('monogram').value.toUpperCase();
    this.monogramToSave.placement = this.form.get('placement').value;
    this.monogramToSave.font = this.form.get('font').value;
    this.monogramToSave.threadColor = this.form.get('threadColor').value;
    this.monogramToSave.itemName = this.form.get('itemName').value;
    this.monogramToSave.designNotes = this.form.get('designNotes').value;
    this.monogramToSave.otherPlacement = this.savingOther(MonogramProperties.PLACEMENT, MonogramProperties.OTHERPLACEMENT);
    this.monogramToSave.otherFont = this.savingOther(MonogramProperties.FONT, MonogramProperties.OTHERFONT);


    this.monogramService.createNewMonogram(this.monogramToSave).subscribe(result => {
      this.formStateService.update(result, OrderItemProperties.MONOGRAM);
      this.monogramToSave = result;
      this.formStateService.updateMonogram(this.monogramToSave);
    });
    this.isMonogramCreated.emit(false);
    this.saved = false;
  }

  deleteMonogram(monogram: Monogram, index: number, $event: MouseEvent) {
    this.saved = false;
    $event.stopPropagation();
    if (monogram.id) {
      const dialogRef = this.matDialog.open(WarningDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
          this.confirmDelete = result;
          if (this.confirmDelete) {
            this.monogramService.deleteMonogram(monogram);
            this.formStateService.removeMonogram(monogram);
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

  private savingOther(value: string, other: string) {
    return this.monogramToSave[`${value}`] === 'Other' ? this.form.get(`${other}`).value : null;
  }

  displayMonogram() {
    if (this.monogram.value && this.monogramOption.value === MonogramOptions.THREELETTER) {
      return this.monogram.value.toUpperCase();
    }

    if (this.monogram.value) {
      return this.monogram.value;
    }

    return 'No Monogram Selected';
  }

  openDialog() {
    const dialogRef = this.matDialog.open(WarningDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }
}

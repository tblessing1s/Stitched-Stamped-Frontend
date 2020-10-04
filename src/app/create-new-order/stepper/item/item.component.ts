import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MonogramService} from '../../../services/item/monogram.service';
import {FormStateService} from '../../../services/form-state/form-state.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit {
  form: FormGroup;
  forms: FormArray;
  overallForm: FormGroup;
  monogramList = [];
  @Input() orderSubmitted: boolean;
  isMonogramNotCreated: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private monogramService: MonogramService,
    private formStateService: FormStateService
  ) {
    if (!this.form) {
      this.form = this.formBuilder.group({});
      this.form.setErrors({invalid: true});
    }

    this.overallForm = this.formBuilder.group({
      arrayForm: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.formStateService.getListOfMonogramsState().subscribe(monograms => {
      this.monogramList = monograms;
    });
  }

  get arrayForm() {
    return this.overallForm.get('arrayForm')['controls'];
  }

  addForm() {
    this.arrayForm.push(this.form);
    this.isMonogramNotCreated = true;
  }

  removeForm(formIndexToRemove) {
    this.arrayForm.splice(formIndexToRemove, 1);
    if (this.arrayForm.length === 0) {
      this.form.setErrors({invalid: true});
    }
  }
}

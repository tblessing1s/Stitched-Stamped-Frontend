import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpecialOrderComponent } from './edit-special-order.component';

describe('EditSpecialOrderComponent', () => {
  let component: EditSpecialOrderComponent;
  let fixture: ComponentFixture<EditSpecialOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSpecialOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpecialOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

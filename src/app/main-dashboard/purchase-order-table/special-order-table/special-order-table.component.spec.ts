import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOrderTableComponent } from './special-order-table.component';

describe('SpecialOrderTableComponent', () => {
  let component: SpecialOrderTableComponent;
  let fixture: ComponentFixture<SpecialOrderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialOrderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOrderDisplayComponent } from './special-order-display.component';

describe('SpecialOrderDisplayComponent', () => {
  let component: SpecialOrderDisplayComponent;
  let fixture: ComponentFixture<SpecialOrderDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialOrderDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialOrderDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

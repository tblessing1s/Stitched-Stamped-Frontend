import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMonogramComponent } from './edit-monogram.component';

describe('EditMonogramComponent', () => {
  let component: EditMonogramComponent;
  let fixture: ComponentFixture<EditMonogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMonogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMonogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

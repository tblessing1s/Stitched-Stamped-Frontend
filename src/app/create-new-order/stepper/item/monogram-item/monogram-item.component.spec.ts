import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonogramItemComponent } from './monogram-item.component';

describe('MonogramItemComponent', () => {
  let component: MonogramItemComponent;
  let fixture: ComponentFixture<MonogramItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonogramItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonogramItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

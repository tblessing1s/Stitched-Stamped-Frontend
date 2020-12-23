import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonogramTableComponent } from './monogram-table.component';

describe('MonogramTableComponent', () => {
  let component: MonogramTableComponent;
  let fixture: ComponentFixture<MonogramTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonogramTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonogramTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

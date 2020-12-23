import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonogramDisplayComponent } from './monogram-display.component';

describe('MonogramDisplayComponent', () => {
  let component: MonogramDisplayComponent;
  let fixture: ComponentFixture<MonogramDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonogramDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonogramDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

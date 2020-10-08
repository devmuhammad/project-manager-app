import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendDuedateComponent } from './extend-duedate.component';

describe('ExtendDuedateComponent', () => {
  let component: ExtendDuedateComponent;
  let fixture: ComponentFixture<ExtendDuedateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendDuedateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendDuedateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

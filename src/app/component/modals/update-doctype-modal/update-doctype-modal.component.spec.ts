import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDoctypeModalComponent } from './update-doctype-modal.component';

describe('UpdateDoctypeModalComponent', () => {
  let component: UpdateDoctypeModalComponent;
  let fixture: ComponentFixture<UpdateDoctypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDoctypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDoctypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

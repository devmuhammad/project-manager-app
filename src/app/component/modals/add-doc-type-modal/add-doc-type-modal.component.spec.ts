import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocTypeModalComponent } from './add-doc-type-modal.component';

describe('AddDocTypeModalComponent', () => {
  let component: AddDocTypeModalComponent;
  let fixture: ComponentFixture<AddDocTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

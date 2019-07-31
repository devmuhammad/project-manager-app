import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStatusModalComponent } from './create-status-modal.component';

describe('CreateStatusModalComponent', () => {
  let component: CreateStatusModalComponent;
  let fixture: ComponentFixture<CreateStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

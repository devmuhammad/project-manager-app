import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocTypeModalComponent } from './create-doc-type-modal.component';

describe('CreateDocTypeModalComponent', () => {
  let component: CreateDocTypeModalComponent;
  let fixture: ComponentFixture<CreateDocTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDocTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDocTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

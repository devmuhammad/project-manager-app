import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGroupModalComponent } from './update-group-modal.component';

describe('UpdateGroupModalComponent', () => {
  let component: UpdateGroupModalComponent;
  let fixture: ComponentFixture<UpdateGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

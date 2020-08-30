import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServerAccountComponent } from './add-server-account.component';

describe('AddServerAccountComponent', () => {
  let component: AddServerAccountComponent;
  let fixture: ComponentFixture<AddServerAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServerAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

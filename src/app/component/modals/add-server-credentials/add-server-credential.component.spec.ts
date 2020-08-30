import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServerCredentialComponent } from './add-server-credential.component';

describe('AddServerCredentialComponent', () => {
  let component: AddServerCredentialComponent;
  let fixture: ComponentFixture<AddServerCredentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServerCredentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServerCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

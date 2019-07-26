import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerCredentialsComponent } from './server-credentials.component';

describe('ServerCredentialsComponent', () => {
  let component: ServerCredentialsComponent;
  let fixture: ComponentFixture<ServerCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

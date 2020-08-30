import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerAccountComponent } from './server-account.component';

describe('ServerAccountComponent', () => {
  let component: ServerAccountComponent;
  let fixture: ComponentFixture<ServerAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

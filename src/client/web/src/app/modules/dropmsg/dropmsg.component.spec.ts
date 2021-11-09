import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropmsgComponent } from './dropmsg.component';

describe('DropmsgComponent', () => {
  let component: DropmsgComponent;
  let fixture: ComponentFixture<DropmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmTablerosComponent } from './adm-tableros.component';

describe('AdmTablerosComponent', () => {
  let component: AdmTablerosComponent;
  let fixture: ComponentFixture<AdmTablerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmTablerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmTablerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

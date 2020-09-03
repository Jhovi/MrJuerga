import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmBoletaComponent } from './adm-boleta.component';

describe('AdmBoletaComponent', () => {
  let component: AdmBoletaComponent;
  let fixture: ComponentFixture<AdmBoletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmBoletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

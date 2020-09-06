import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetalleComponent } from './add-detalle.component';

describe('AddDetalleComponent', () => {
  let component: AddDetalleComponent;
  let fixture: ComponentFixture<AddDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

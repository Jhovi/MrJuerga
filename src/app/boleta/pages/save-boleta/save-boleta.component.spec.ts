import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBoletaComponent } from './save-boleta.component';

describe('SaveBoletaComponent', () => {
  let component: SaveBoletaComponent;
  let fixture: ComponentFixture<SaveBoletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveBoletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

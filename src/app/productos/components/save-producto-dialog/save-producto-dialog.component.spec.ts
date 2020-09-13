import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProductoDialogComponent } from './save-producto-dialog.component';

describe('SaveProductoDialogComponent', () => {
  let component: SaveProductoDialogComponent;
  let fixture: ComponentFixture<SaveProductoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveProductoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProductoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

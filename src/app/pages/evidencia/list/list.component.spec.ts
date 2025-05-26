import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEvidenciaComponent } from './list.component';

describe('ListEvidenciaComponent', () => {
  let component: ListEvidenciaComponent;
  let fixture: ComponentFixture<ListEvidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEvidenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEvidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

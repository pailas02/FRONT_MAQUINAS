import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEvidenciaComponent } from './manage.component';

describe('ManageEvidenciaComponent', () => {
  let component: ManageEvidenciaComponent;
  let fixture: ComponentFixture<ManageEvidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEvidenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEvidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

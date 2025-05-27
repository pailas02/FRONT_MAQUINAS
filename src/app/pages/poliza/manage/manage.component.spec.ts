import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePolizaMaquinaComponent } from './manage.component';

describe('ManagePolizaMaquinaComponent', () => {
  let component: ManagePolizaMaquinaComponent;
  let fixture: ComponentFixture<ManagePolizaMaquinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePolizaMaquinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePolizaMaquinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOperarioComponent } from './manage.component';

describe('ManageOperarioComponent', () => {
  let component: ManageOperarioComponent;
  let fixture: ComponentFixture<ManageOperarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOperarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOperarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

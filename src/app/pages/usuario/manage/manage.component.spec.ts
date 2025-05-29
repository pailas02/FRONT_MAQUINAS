import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsuarioComponent } from './manage.component';

describe('ManageUsuarioComponent', () => {
  let component: ManageUsuarioComponent;
  let fixture: ComponentFixture<ManageUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

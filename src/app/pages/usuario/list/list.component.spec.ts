import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsuarioComponent } from './list.component';

describe('ListUsuarioComponent', () => {
  let component: ListUsuarioComponent;
  let fixture: ComponentFixture<ListUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

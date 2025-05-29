import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOperarioComponent } from './list.component';

describe('ListOperarioComponent', () => {
  let component: ListOperarioComponent;
  let fixture: ComponentFixture<ListOperarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOperarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOperarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

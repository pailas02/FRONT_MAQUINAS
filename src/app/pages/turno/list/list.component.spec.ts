import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTurnoComponent } from '../list/list.component';

describe('ListTurnoComponent', () => {
  let component: ListTurnoComponent;
  let fixture: ComponentFixture<ListTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

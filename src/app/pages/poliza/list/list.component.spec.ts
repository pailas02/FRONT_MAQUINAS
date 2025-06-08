import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPolizaMaquinaComponent } from './list.component';

describe('ListPolizaMaquinaComponent', () => {
  let component: ListPolizaMaquinaComponent;
  let fixture: ComponentFixture<ListPolizaMaquinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPolizaMaquinaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListPolizaMaquinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordSentComponentComponent } from './reset-password-sent-component.component';

describe('ResetPasswordSentComponentComponent', () => {
  let component: ResetPasswordSentComponentComponent;
  let fixture: ComponentFixture<ResetPasswordSentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordSentComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordSentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

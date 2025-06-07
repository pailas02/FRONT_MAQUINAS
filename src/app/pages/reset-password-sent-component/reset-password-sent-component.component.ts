import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-sent-component',
  templateUrl: './reset-password-sent-component.component.html',
  styleUrls: ['./reset-password-sent-component.component.scss']
})
export class ResetPasswordSentComponentComponent implements OnInit {
  countdown = 5;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.router.navigate(['/verify-code']);
      }
    }, 1000);
  }
}

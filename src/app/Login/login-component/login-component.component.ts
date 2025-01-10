import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {
  currentLogin: string = 'student';  // Default to student login

  // This method updates the selected login type
  selectLogin(loginType: string) {
    this.currentLogin = loginType;
  }
}

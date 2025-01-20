import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {
  email: string = '';
  password: string = '';
  role: string = '';
  message: string = ''; 
  private apiUrl: string = 'http://localhost:8080'; // Backend URL

  constructor(private http: HttpClient, private router: Router) {}

  selectRole(selectedRole: string): void {
    this.role = selectedRole;
    this.message = '';
  }

  onLoginSubmit(): void {
    if (this.email && this.password && this.role) {
      const loginData = {
        email: this.email,
        password: this.password
      };

      let loginEndpoint = '';
      switch (this.role) {
        case 'student':
          loginEndpoint = '/validate';  // General user validation
          break;
        case 'manager':
          loginEndpoint = '/validatem';  // Manager validation
          break;
        case 'trainer':
          loginEndpoint = '/validatet';  // Trainer validation
          break;
        default:
          this.message = 'Please select a role';
          return;
      }

      this.http.post(`${this.apiUrl}${loginEndpoint}`, loginData)
      .subscribe({
        next: (response: any) => {
          console.log('Login successful', response);
          
          if (this.role === 'student') {
            this.router.navigate(['course']);
          } else if (this.role === 'manager') {
            this.router.navigate(['manager']);
          } else if (this.role === 'trainer') {
            this.router.navigate(['home']);
          } 
          // else {
          //   this.router.navigate(['timeline']);
          // }
        },
        error: (error) => {
          console.error('Login failed', error);
          this.message = 'Invalid email or password'; 
        }
      });
  } else {
    this.message = 'Please fill in all fields'; 
  }
}
}

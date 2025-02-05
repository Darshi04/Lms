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
  role: string = 'Student';
  message: string = '';
  passwordVisible: boolean = false; 
  private apiUrl: string = 'http://localhost:8080'; // Backend URL


  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible; 
  }

  constructor(private http: HttpClient, private router: Router) { }


  selectRole(selectedRole: string): void {
    this.role = selectedRole;
    this.message = '';
  }

  onLoginSubmit(): void {
    if (this.email && this.password) {
      const loginData = { email: this.email, password: this.password };
      let loginEndpoint = '';

      switch (this.role) {
        case 'Student':
          loginEndpoint = '/validate_student';
          break;
        case 'Manager':
          loginEndpoint = '/validate_manager';
          break;
        case 'Trainer':
          loginEndpoint = '/validate_trainer';
          break;
        default:
          this.message = 'Please select a role';
          return;
      }

      this.http.post(`${this.apiUrl}${loginEndpoint}`, loginData)
        .subscribe({
          next: (response: any) => {
            console.log('Login successful', response);

            localStorage.setItem('user', JSON.stringify(response));
            // Store role in localStorage
            localStorage.setItem('role', this.role);

            // Log and navigate based on role
            if (this.role === 'Student') {
              console.log('Navigating to dashboard');
              this.router.navigate(['/trainee-dashboard']);
            } 
            
            else if (this.role === 'Manager') {
              console.log('Navigating to manager');
              this.router.navigate(['manager-dashboard']);
            } else if (this.role === 'Trainer') {
              console.log('Navigating to home');
              this.router.navigate(['/trainer-dashboard']);
            }
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

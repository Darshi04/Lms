import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  emailSubmitted = false;
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  role: string = '';
  message: string = '';  

  constructor(private http: HttpClient, private router: Router) {}

  selectRole(selectedRole: string): void {
    this.role = selectedRole;
    this.message = ''; 
  }

  onEmailSubmit() {
    if (!this.email) {
      this.message = 'Please enter a valid email address.';
      return;
    }
  
    let endpoint = '';
    if (this.role === 'student') {
      endpoint = 'http://localhost:8080/student_verify';
    } else if (this.role === 'manager') {
      endpoint = 'http://localhost:8080/manager_verify';
    } else if (this.role === 'trainer') {
      endpoint = 'http://localhost:8080/trainer_verify';
    }

    this.http.post(endpoint, { email: this.email }).subscribe(
      (response: any) => {
        this.emailSubmitted = true;
      },
      error => {
        console.error('Error occurred:', error);
        this.message = 'Email not found or other error occurred.';
      }
    );
  }

  onSetPasswordSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      return;
    }
  
    let endpoint = '';
    if (this.role === 'student') {
      endpoint = 'http://localhost:8080/update_student_password';
    } else if (this.role === 'manager') {
      endpoint = 'http://localhost:8080/update_manager_password';
    } else if (this.role === 'trainer') {
      endpoint = 'http://localhost:8080/update_trainer_password';
    }

    const payload = {
      email: this.email,
      password: this.newPassword
    };
  
    this.http.post(endpoint, payload).subscribe(
      (response: any) => {
        this.message = response.msg; 
        setTimeout(() => {
          this.router.navigate(['/login']); 
        }, 2000); 
      },
      error => {
        console.error('Error updating password:', error);
        this.message = 'Error updating password.';
      }
    );
  }
}

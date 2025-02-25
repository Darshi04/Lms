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
  email: string = '';
  role: string = 'student';
  password:string='';
  newPassword: string = '';
  confirmPassword: string = '';
  verificationCode: string = '';
  emailSubmitted = false;
  verificationCodeSent = false;
  codeVerified = false;
  message: string = '';
  roles = ['student', 'manager', 'trainer'];

  passwordVisible: boolean = false; 
  confirmPasswordVisible: boolean = false;

  togglePasswordVisibility(type: string) {

    if (type === 'new') {
      this.passwordVisible = !this.passwordVisible; 
    } else if (type === 'confirm') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  constructor(private http: HttpClient, private router: Router) {}

selectRole(selectedRole: string): void {
    this.role = selectedRole;
    this.message = ''; 
  }

  onEmailSubmit() {
    if (!this.email) {
      this.message = 'Please enter a valid ${this.role} email address.';
      return;
    }
    
   
    let endpoint = 'http://localhost:8080/request';
    this.http.post(endpoint, { email: this.email, role: this.role }).subscribe(
      (response: any) => {
        this.password=response.password;
        this.message = 'Verification code sent. Check your email.';
        this.verificationCodeSent = true;
        
      },
      error => {
        this.message = error?.error?.msg || 'Error occurred while sending verification code.';
      }
    );
  }

  onCodeSubmit() {
    if (!this.verificationCode) {
      this.message = 'Please enter the verification code.';
      return;
    }

    let endpoint = 'http://localhost:8080/verify';
    

    this.http.post(endpoint, { email: this.email, code: this.verificationCode ,role:this.role}).subscribe(
      (response: any) => {
        this.message = 'Code verified. You can now reset your password.';
        this.codeVerified = true;
      },
      error => {
        this.message = 'Invalid verification code.';
      }
    );
  }

 
  onSetPasswordSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      return;
    }
  
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  
    if (!passwordRegex.test(this.newPassword)) {
      this.message = 'Please re-check your password to satisfy the criteria';
      return;
    }
  
    if (this.newPassword === this.password) {
      this.message = 'New password cannot be the same as the old password.';
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

    const payload = { email: this.email, password: this.newPassword };

    this.http.post(endpoint, payload).subscribe(
      (response: any) => {
        this.message = 'Password updated successfully.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error => {
        this.message = 'Error updating password.';
      }
    );
  }
}



import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TraineeHeaderComponent } from '../trainee-header/trainee-header.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule,TraineeHeaderComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any;
  msg:any;
 
  fields: { label: string, key: string, type: string }[] = [
    { label: 'Profile', key: 'profile', type: 'input' },
    { label: 'Name', key: 'student_name', type: 'text' },
    { label: 'Employee Id', key: 'rn_id', type: 'text' },
    { label: 'Email', key: 'email', type: 'email' },
    { label: 'Skills', key: 'skills', type: 'text' }
  ];

  constructor(private http: HttpClient) {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.user = parsedUserData.students[0]; 
    }
    else {
      this.user = {}; 
    }
    
  }


  saveEditedStudent() {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(`http://localhost:8080/updateStudent/${this.user.rn_id}`, this.user, { headers })
      .subscribe(
        (response: any) => {
          console.log('Student updated:', response);
          localStorage.setItem('user', JSON.stringify({ students: [this.user] }));
          this.msg='Updated Suceesfully';
          setTimeout(() => {
            this.msg = '';  // Clear the error message
          }, 2000);
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.user.profile = reader.result as string; 
      };
      reader.readAsDataURL(file);  
    }
  }
}

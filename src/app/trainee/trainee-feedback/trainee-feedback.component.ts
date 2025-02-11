import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TraineeHeaderComponent } from '../trainee-header/trainee-header.component';

@Component({
  selector: 'app-trainee-feedback',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule, TraineeHeaderComponent],
  templateUrl: './trainee-feedback.component.html',
  styleUrls: ['./trainee-feedback.component.css'],
})
export class TraineeFeedbackComponent implements OnInit {
  isSidebarOpen: boolean = true;
  feedbackForm!: FormGroup;  // FormGroup to manage the form
  serverMsg = 'error';
  user:any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      console.log(this.user);
      this.user = parsedUserData.students[0]; // Access the first student in the array
      console.log(this.user);
      
    }
  }

  ngOnInit(): void {
    // Initialize the form with validators
    this.feedbackForm = this.fb.group({
      name: this.user?.student_name,
      email: this.user?.email, 
      comments: ['', [Validators.required]], 
    });
  }

  

  // Method to toggle sidebar visibility
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Submit the feedback form
  submitFeedback() {
    console.log("fdsdfsdf");
    if (this.feedbackForm.invalid) {
      
      
      return; // Stop submission if any field is invalid
    }

    // Prepare the data to send
    const data = {
      name: this.user.student_name, // Use user.student_name
      email: this.user.email, // Use user.email
      comments: this.feedbackForm.value.comments, // Get comments from the form
      profile: this.user.profile // Include user.profile
    };

    // Log feedback to the console for testing
    console.log('Feedback submitted:', data);

    // Make the HTTP POST request to the backend server
    this.http.post("http://localhost:8080/feedback", data).subscribe({
      next: (res: any) => {
        console.log(res); // Handle successful response
        localStorage.setItem('status', '1');
        alert('Feedback submitted successfully!');
       this.resetForm();
      },
      error: (e) => {
        console.log(e); // Handle error response
        this.serverMsg = e.error?.msg || 'Submission failed. Please try again later.';
        alert(this.serverMsg); // Show error message
      },
    });
  }
  resetForm(){
    this.feedbackForm.controls['comments'].reset();

    // this.feedbackForm.reset();
       // Reset any previous error messages
    
  }
}

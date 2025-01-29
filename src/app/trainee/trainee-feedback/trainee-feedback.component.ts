import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TraineeHeaderComponent } from '../trainee-header/trainee-header.component';

@Component({
  selector: 'app-trainee-feedback',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,FormsModule,CommonModule,TraineeHeaderComponent],
  templateUrl: './trainee-feedback.component.html',
  styleUrl: './trainee-feedback.component.css'
})
export class TraineeFeedbackComponent implements OnInit {
  isSidebarOpen: boolean = true;
  feedbackForm!: FormGroup;  // FormGroup to manage the form
  serverMsg = 'error';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    // Initialize the form with validators
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      comments: ['', [Validators.required]]
    });
  }

  // Method to toggle sidebar visibility
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
  }

  // Submit the feedback form
  submitFeedback() {
    if (this.feedbackForm.invalid) {
      return; // Stop submission if any field is invalid
    }

    // Prepare the data to send
    const data = this.feedbackForm.value;

    // Log feedback to the console for testing
    console.log('Feedback submitted:', data);

    // Make the HTTP POST request to the backend server
    this.http.post("http://localhost:8081/feedback", data).subscribe({
      next: (res: any) => {
        console.log(res); // Handle successful response
        localStorage.setItem("status", "1");
        alert('Feedback submitted successfully!');
       this.resetForm();
      },
      error: (e) => {
        console.log(e); // Handle error response
        this.serverMsg = e.error?.msg || 'Submission failed. Please try again later.';
        alert(this.serverMsg); // Show error message
      }
    });
  }
  resetForm(){
   
    this.feedbackForm.reset();
       // Reset any previous error messages
    
  }
}
